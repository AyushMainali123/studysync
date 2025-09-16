'use client';
import { mutationKeys } from '@/queries';
import { StorageItemRequest } from '@/requests/storageitem-request';
import { Button } from '@studysync/ui/components/button';
import { useMutation } from '@tanstack/react-query';
import { Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface ICreate {
  workspaceId: string;
  parentId: string | null;
}
export default function Create({ workspaceId, parentId }: ICreate) {
  const { mutateAsync: createNewStorageItem, isPending: isCreating } =
    useMutation({
      mutationKey: [mutationKeys.storageitem.create],
      mutationFn: StorageItemRequest.createStorageItem,
    });

  const router = useRouter();

  const createStorageItem = async () => {
    const item = await createNewStorageItem({
      name: 'MY Storage Item',
      parentId,
      workspaceId,
      type: 'document',
    });
    router.push(`/w/${workspaceId}/item/${item.id}`);
  };

  return (
    <div>
      <Button onClick={createStorageItem} disabled={isCreating}>
        Create file
        {isCreating && (
          <Loader2 aria-hidden="true" className="animate animate-spin" />
        )}
      </Button>
    </div>
  );
}
