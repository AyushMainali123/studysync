import { NextResponse, NextRequest } from 'next/server';
import { ServiceFactory } from './factory/service-factory';
import { setTokenExpiration } from './utils/set-token-expire-date';
import { OAuthProvider } from '@studysync/db';

export async function middleware(request: NextRequest) {
  const googleAuthService = ServiceFactory.googleAuthService();
  const tokenService = await ServiceFactory.tokenService();
  const refreshToken = tokenService.getRefreshToken();
  const accessToken = tokenService.getAccessToken();
  const providerAccountId = tokenService.getProviderAccountId();

  // This is the AccountRepository(prisma) which is exported. So, we can substitute it as well.
  const accountRepo = googleAuthService.accountRepo;

  if (!refreshToken || !providerAccountId) {
    console.error('No  token or provider id found');
    tokenService.deleteAll();
    return NextResponse.redirect(new URL('/auth/signin', request.url));
  }

  try {
    await googleAuthService.validateAccessToken(accessToken);
    return NextResponse.next();
  } catch {
    try {
      const tokenResult =
        await googleAuthService.generateNewAccessToken(refreshToken);
      await accountRepo.updateAccessTokenUsingProvider(
        providerAccountId,
        OAuthProvider.google,
        tokenResult.access_token,
        setTokenExpiration(tokenResult.expires_in)
      );
      tokenService.setAccessToken(
        tokenResult.access_token,
        setTokenExpiration(tokenResult.expires_in).getTime()
      );

      return NextResponse.next();
    } catch (error) {
      console.error(error);
      tokenService.deleteAll();
      return NextResponse.redirect(new URL(`/auth/signin`, request.url));
    }
  }
}

export const config = {
  matcher: ['/home', '/home/:path*'],
  runtime: 'nodejs',
};
