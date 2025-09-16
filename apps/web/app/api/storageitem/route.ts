import { ServiceFactory } from '@/factory/service-factory';
import { StorageItemType } from '@studysync/db';

export async function POST(request: Request) {
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

    const body = (await request.json()) as {
      name: string;
      type: StorageItemType;
      workspaceId: string;
      parentId?: string;
    };

    const storageItem = ServiceFactory.storageItemService();
    const createdItem = await storageItem.createStorageItem({
      ...body,
      creatorId: accountData.userId,
    });

    return Response.json(createdItem);
  } catch (error) {
    console.error('Error in POST /api/storageitem:', error);
    return Response.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
