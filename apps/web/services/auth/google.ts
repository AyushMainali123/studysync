import { AccountRepository, UserRepository } from '@studysync/repos';
import {
  TAccessTokenResult,
  TGoogleTokensResult,
  TGoogleUserInfo,
} from './auth.types';
import { OAuthProvider, prisma, PrismaClient } from '@studysync/db';
import { setTokenExpiration } from '@/utils/set-token-expire-date';
import { ServiceFactory } from '@/factory/service-factory';

const AUTH_ERROR_MESSAGE = {
  INVALID_TOKEN: 'Invalid or expired access token',
  INVALID_GRANT: 'Refresh token invalid or revoked; re-authentication required',
  USER_NOT_FOUND: 'User not found',
};

export class GoogleAuthService {
  private _userRepo: UserRepository;
  private _accountRepo: AccountRepository;

  constructor(_userRepo: UserRepository, _accountRepo: AccountRepository) {
    this._userRepo = _userRepo;
    this._accountRepo = _accountRepo;
  }

  private async getGoogleTokens(code: string) {
    const tokenUrl = 'https://oauth2.googleapis.com/token';
    const values = {
      code,
      client_id: process.env.GOOGLE_CLIENT_ID!,
      client_secret: process.env.GOOGLE_CLIENT_SECRET!,
      redirect_uri: process.env.GOOGLE_CLIENT_REDIRECT_URI!,
      grant_type: 'authorization_code',
    };

    const headers = new Headers();
    headers.set('Content-Type', 'application/x-www-form-urlencoded');

    const responseRaw = await fetch(tokenUrl, {
      method: 'POST',
      headers,
      body: new URLSearchParams(values).toString(),
    });

    const response = (await responseRaw.json()) as TGoogleTokensResult;

    return response;
  }

  private async getGoogleUserInfo(accessToken: string) {
    const responseRaw = await fetch(
      `https://www.googleapis.com/oauth2/v1/userinfo?alt=json`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    const response = (await responseRaw.json()) as TGoogleUserInfo;

    return response;
  }

  async validateAccessToken(accessToken: string) {
    const response = await fetch(
      `https://oauth2.googleapis.com/tokeninfo?access_token=${accessToken}`
    );

    if (!response.ok) {
      if (response.status === 400 || response.status === 401) {
        throw new Error(AUTH_ERROR_MESSAGE.INVALID_TOKEN);
      }
      throw new Error(`Token validation failed: ${response.statusText}`);
    }

    const tokenInfo = (await response.json()) as TAccessTokenResult;

    if (tokenInfo.expires_in <= 0) {
      throw new Error(AUTH_ERROR_MESSAGE.INVALID_TOKEN);
    }

    return tokenInfo;
  }

  async generateNewAccessToken(refreshToken: string) {
    const tokenUrl = 'https://oauth2.googleapis.com/token';
    const values = {
      client_id: process.env.GOOGLE_CLIENT_ID!,
      client_secret: process.env.GOOGLE_CLIENT_SECRET!,
      refresh_token: refreshToken,
      grant_type: 'refresh_token',
    };

    const headers = new Headers();
    headers.set('Content-Type', 'application/x-www-form-urlencoded');

    const responseRaw = await fetch(tokenUrl, {
      method: 'POST',
      headers,
      body: new URLSearchParams(values).toString(),
    });

    const response = (await responseRaw.json()) as TGoogleTokensResult;
    return response;
  }

  async signinWithGoogle({ code }: { code: string }) {
    // Logic to handle Google OAuth login
    const tokens = await this.getGoogleTokens(code);
    const userInfo = await this.getGoogleUserInfo(tokens.access_token);

    // Check if the user exist in the DB. We check users by email
    const userDB = await this._userRepo.findByEmail(userInfo.email);
    if (userDB) {
      await this._accountRepo.updateAccessTokenUsingProvider(
        userInfo.id,
        OAuthProvider.google,
        tokens.access_token,
        setTokenExpiration(tokens.expires_in)
      );
      await this._accountRepo.updateRefreshTokenUsingProvider(
        userInfo.id,
        OAuthProvider.google,
        tokens.refresh_token!
      );

      // User exists, proceed with login
      return {
        name: userDB.name,
        email: userDB.email,
        tokens,
        provider: OAuthProvider.google,
        providerAccountId: userInfo.id,
      };
    } else {
      const { user } = await prisma.$transaction(async (tx) => {
        const _client = tx as unknown as PrismaClient;

        const user = await this._userRepo.createWithClient(_client, {
          email: userInfo.email,
          name: userInfo.name,
        });

        const account = await this._accountRepo.createWithClient(_client, {
          userId: user.id,
          provider: OAuthProvider.google,
          providerAccountId: userInfo.id,
          expiresAt: new Date(Date.now() + tokens.expires_in * 1000),
          accessToken: tokens.access_token,
          refreshToken: tokens.refresh_token,
        });

        return { user, account };
      });

      return {
        name: user.name,
        email: user.email,
        tokens,
        provider: OAuthProvider.google,
        providerAccountId: userInfo.id,
      };
    }
  }

  async ensureValidAccessToken() {
    const tokenService = await ServiceFactory.tokenService();
    const accessToken = tokenService.getAccessToken();
    const refreshToken = tokenService.getRefreshToken();
    try {
      await this.validateAccessToken(accessToken);
      return accessToken;
    } catch {
      const newToken = await this.generateNewAccessToken(refreshToken);
      tokenService.setAccessToken(newToken.access_token);
      return newToken.access_token;
    }
  }

  async getUserFromAccessToken(accessToken: string) {
    try {
      const googleUserInfo = await this.getGoogleUserInfo(accessToken);
      // Get Account
      const userAccountData = await this._accountRepo.findByProviderAccountId(
        OAuthProvider.google,
        googleUserInfo.id
      );

      return userAccountData;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  }

  get userRepo() {
    return this._userRepo;
  }

  get accountRepo() {
    return this._accountRepo;
  }
}
