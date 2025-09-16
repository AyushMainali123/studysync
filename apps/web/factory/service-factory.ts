import { prisma } from '@studysync/db';
import {
  AccountRepository,
  StorageItemRepository,
  UserRepository,
  WorkspaceRepository,
} from '@studysync/repos';
import { GoogleAuthService } from '@/services/auth';
import { cookies } from 'next/dist/server/request/cookies';
import { TokenService } from '@/services/tokens';
import { WorkspaceService } from '@/services/workspace';
import { StorageItemService } from '@/services/storageitem';

export class ServiceFactory {
  static googleAuthService(): GoogleAuthService {
    const userRepo = new UserRepository(prisma);
    const accountRepo = new AccountRepository(prisma);
    return new GoogleAuthService(userRepo, accountRepo);
  }

  static async tokenService(): Promise<TokenService> {
    const cookieStore = await cookies();
    return new TokenService(cookieStore);
  }

  static workspaceService(): WorkspaceService {
    const workspaceRepo = new WorkspaceRepository(prisma);
    return new WorkspaceService(workspaceRepo);
  }

  static storageItemService(): StorageItemService {
    return new StorageItemService(
      new StorageItemRepository(prisma),
      new WorkspaceRepository(prisma)
    );
  }
}
