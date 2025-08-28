import { ServiceFactory } from '@/factory/service-factory';
import { cookies } from 'next/headers';

export async function GET() {
  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get('access_token')?.value || '';
    const refreshToken = cookieStore.get('refresh_token')?.value || '';

    const authService = ServiceFactory.googleAuthService();
    const validAccessToken = await authService.ensureValidAccessToken(
      accessToken,
      refreshToken
    );
    const accountData =
      await authService.getUserFromAccessToken(validAccessToken);

    if (!accountData?.user) {
      return Response.json(
        { error: 'Failed to retrieve user information.' },
        { status: 401 }
      );
    }

    return Response.json(accountData.user);
  } catch (error) {
    if (error instanceof Error) {
      return Response.json(
        {
          error: error.message,
        },
        { status: 500 }
      );
    }
    return Response.json(
      { error: 'Failed to retrieve user information.' },
      { status: 500 }
    );
  }
}
