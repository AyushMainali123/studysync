import { prisma } from '@studysync/db';
import { UserRepository } from '@studysync/repos';
import { UserService } from '@/services/user-service';

export class ServiceFactory {
  static userService(): UserService {
    const repo = new UserRepository(prisma);
    return new UserService(repo);
  }
}
