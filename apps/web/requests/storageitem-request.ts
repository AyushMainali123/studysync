import { API_BASE_URL } from '@/constants';
import { StorageItemType } from '@studysync/db';
import { DBStorageItem } from '@studysync/types';

export class StorageItemRequest {
  static async createStorageItem(input: {
    name: string;
    type: StorageItemType;
    workspaceId: string;
    parentId: string | null;
  }) {
    const responseRaw = await fetch(`${API_BASE_URL}/api/storageitem`, {
      method: 'POST',
      body: JSON.stringify(input),
    });

    const response = (await responseRaw.json()) as DBStorageItem;
    return response;
  }
}
