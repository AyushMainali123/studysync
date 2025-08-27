import { ServiceFactory } from '@/lib/factory/service-factory';
import { cookies } from 'next/headers';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get('code');
  const redirectPath =
    searchParams.get('redirect') || process.env.NEXT_PUBLIC_BASE_URL!;

  if (!code) {
    return Response.json(
      { error: 'Invalid authorization code.' },
      { status: 400 }
    );
  }

  const authService = ServiceFactory.authService();
  const user = await authService.signinWithGoogle({ code });

  if (!user) {
    return Response.json(
      { error: 'Failed to authenticate user.' },
      { status: 401 }
    );
  }

  const cookieStore = await cookies();

  cookieStore.set('access_token', user.access_token, {
    httpOnly: true,
    path: '/',
    sameSite: 'strict',
  });
  cookieStore.set('refresh_token', user.refresh_token, {
    httpOnly: true,
    path: '/api/auth/google/refresh',
    sameSite: 'strict',
  });

  return Response.redirect(redirectPath);
}
