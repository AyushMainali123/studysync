import { AccountRepository, UserRepository } from '@studysync/repos';
import { TGoogleTokensResult, TGoogleUserInfo } from './auth.types';
import { prisma, PrismaClient } from '@studysync/db';

export class AuthService {
  private userRepo: UserRepository;
  private accountRepo: AccountRepository;

  constructor(userRepo: UserRepository, accountRepo: AccountRepository) {
    this.userRepo = userRepo;
    this.accountRepo = accountRepo;
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

  async signinWithGoogle({ code }: { code: string }) {
    // Logic to handle Google OAuth login
    const tokens = await this.getGoogleTokens(code);
    const userInfo = await this.getGoogleUserInfo(tokens.access_token);

    // Check if the user exist in the DB. We check users by email
    const userDB = await this.userRepo.findByEmail(userInfo.email);
    if (userDB) {
      // User exists, proceed with login
      return {
        access_token: tokens.access_token,
        refresh_token: tokens.refresh_token,
        name: userDB.name,
        email: userDB.email,
      };
    } else {
      const { user } = await prisma.$transaction(async (tx) => {
        const _client = tx as unknown as PrismaClient;

        const user = await this.userRepo.createWithClient(_client, {
          email: userInfo.email,
          name: userInfo.name,
        });

        const account = await this.accountRepo.createWithClient(_client, {
          userId: user.id,
          provider: 'google',
          providerAccountId: userInfo.id,
          expiresAt: new Date(Date.now() + tokens.expires_in * 1000),
          accessToken: tokens.access_token,
          refreshToken: tokens.refresh_token,
        });

        return { user, account };
      });

      return {
        access_token: tokens.access_token,
        refresh_token: tokens.refresh_token,
        name: user.name,
        email: user.email,
      };
    }
  }

  async refreshAccessToken() {}
}
