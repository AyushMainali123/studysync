import { ServiceFactory } from '@/factory/service-factory';
import { setTokenExpiration } from '@/utils/set-token-expire-date';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get('code');
  const redirectPath = searchParams.get('redirect');

  if (!code) {
    return Response.json(
      { error: 'Invalid authorization code.' },
      { status: 400 }
    );
  }

  try {
    const authService = ServiceFactory.googleAuthService();
    const user = await authService.signinWithGoogle({ code });

    if (!user) {
      return Response.json(
        { error: 'Failed to authenticate user.' },
        { status: 401 }
      );
    }

    const tokenService = await ServiceFactory.tokenService();
    tokenService.setAccessToken(
      user.tokens.access_token,
      setTokenExpiration(user.tokens.expires_in).getTime()
    );
    tokenService.setRefreshToken(user.tokens.refresh_token);
    tokenService.setProviderAccountId(user.providerAccountId);

    const redirectUrl = new URL('/redirect', request.url);
    redirectUrl.searchParams.set('redirect', redirectPath || '/home');

    return Response.redirect(redirectUrl, 302);
  } catch (error) {
    if (error instanceof Error) {
      return Response.json({ error: error.message }, { status: 500 });
    } else {
      return Response.json(
        { error: 'An unknown error occurred.' },
        { status: 500 }
      );
    }
  }
}
