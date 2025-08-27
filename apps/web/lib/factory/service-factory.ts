import { prisma } from '@studysync/db';
import { AccountRepository, UserRepository } from '@studysync/repos';
import { AuthService } from '@/services/auth';

export class ServiceFactory {
  static authService(): AuthService {
    const userRepo = new UserRepository(prisma);
    const accountRepo = new AccountRepository(prisma);
    return new AuthService(userRepo, accountRepo);
  }
}
