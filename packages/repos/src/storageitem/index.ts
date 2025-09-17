import { PrismaClient } from '@studysync/db';
import { BaseRepository } from '../base';
import { DBStorageItem, type DBUser } from '@studysync/types';

interface IStorageItemRepository {
  createStorageItemWithClient(
    client: PrismaClient,
    data: ICreateStorageItem
  ): Promise<DBStorageItem>;
}

interface ICreateStorageItem
  extends Pick<
    DBStorageItem,
    'name' | 'type' | 'workspaceId' | 'parentItemId' | 'createdBy'
  > {}

export class StorageItemRepository
  extends BaseRepository
  implements IStorageItemRepository
{
  async createStorageItemWithClient(
    client: PrismaClient,
    data: ICreateStorageItem
  ): Promise<DBStorageItem> {
    const storageItem = await client.storageItem.create({
      data,
    });
    return storageItem;
  }

  async createStorageItem(data: ICreateStorageItem): Promise<DBStorageItem> {
    const storageItem = await this.prisma.storageItem.create({
      data,
    });
    return storageItem;
  }
}
