import { ServiceFactory } from '@/factory/service-factory';

export async function GET(
  _: Request,
  { params }: { params: Promise<{ id: string }> }
) {
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

  const paramsData = await params;
  const workspaceId = paramsData.id;

  const workspaceService = ServiceFactory.workspaceService();
  const response = await workspaceService.getUserWorkspaceById({
    userId: accountData.userId,
    workspaceId: workspaceId,
  });

  return Response.json(response);
}
