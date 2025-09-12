import { ServiceFactory } from '@/factory/service-factory';

export async function POST(request: Request) {
  try {
    const authService = ServiceFactory.googleAuthService();
    const accessToken = await authService.ensureValidAccessToken();

    const userData = await authService.getUserFromAccessToken(accessToken);

    if (!userData) {
      throw new Error('User not found');
    }

    const body = (await request.json()) as {
      name: string;
      description: string;
    };
    const workspaceService = ServiceFactory.workspaceService();

    const workspace = await workspaceService.createWorkspace({
      name: body.name,
      description: body?.description || '',
      ownerId: userData.userId,
    });

    return Response.json({ workspace }, { status: 201 });
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

export async function GET() {
  const authService = ServiceFactory.googleAuthService();
  const accessToken = await authService.ensureValidAccessToken();

  const userData = await authService.getUserFromAccessToken(accessToken);

  if (!userData) {
    throw new Error('User not found');
  }

  const userWorkspaces = ServiceFactory.workspaceService();
  const workspaces = await userWorkspaces.getUserWorkspaces({
    userId: userData.userId,
  });

  return Response.json({ workspaces });
}
