import { prisma } from '@studysync/db';
import { AccountRepository, UserRepository } from '@studysync/repos';
import { GoogleAuthService } from '@/services/auth';
import { cookies } from 'next/dist/server/request/cookies';
import { TokenService } from '@/services/tokens';

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
}
