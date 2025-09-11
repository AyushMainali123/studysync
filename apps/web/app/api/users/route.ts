import { ServiceFactory } from '@/factory/service-factory';

export async function GET() {
  try {
    const authService = ServiceFactory.googleAuthService();
    const validAccessToken = await authService.ensureValidAccessToken();
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
