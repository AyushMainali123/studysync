import { StorageItemType } from '@studysync/db';
import { StorageItemRepository, WorkspaceRepository } from '@studysync/repos';

import z from 'zod';

export class StorageItemService {
  private _storageRepo: StorageItemRepository;
  private _workspaceRepo: WorkspaceRepository;

  constructor(
    _storageRepo: StorageItemRepository,
    _workspaceRepo: WorkspaceRepository
  ) {
    this._storageRepo = _storageRepo;
    this._workspaceRepo = _workspaceRepo;
  }

  async createStorageItem(input: {
    creatorId: string;
    name: string;
    type: StorageItemType;
    workspaceId: string;
    parentItemId?: string;
  }) {
    const parsed = z
      .object({
        name: z.string().min(1),
        type: z.enum(StorageItemType),
        workspaceId: z.cuid(),
        parentItemId: z.cuid().optional(),
        creatorId: z.cuid(),
      })
      .parse(input);

    const user = this._workspaceRepo.getUserWorkspaceById(
      parsed.workspaceId,
      parsed.creatorId
    );

    if (!user) throw new Error('Unauthorized user');

    const storageItem = await this._storageRepo.createStorageItem({
      name: parsed.name,
      type: parsed.type,
      workspaceId: parsed.workspaceId,
      parentItemId: parsed.parentItemId ?? null,
      createdBy: parsed.creatorId,
    });

    return storageItem;
  }
}
