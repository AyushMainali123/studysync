import { PrismaClient } from '@studysync/db';
import { BaseRepository } from '../base';
import { type DBAccount } from '@studysync/types';

interface IAccountRepository {}

interface ICreateAccount
  extends Pick<
    DBAccount,
    | 'accessToken'
    | 'refreshToken'
    | 'expiresAt'
    | 'provider'
    | 'providerAccountId'
    | 'userId'
  > {}

export class AccountRepository
  extends BaseRepository
  implements IAccountRepository
{
  createWithClient(client: PrismaClient, data: ICreateAccount) {
    return client.account.create({
      data: {
        accessToken: data.accessToken,
        refreshToken: data.refreshToken,
        expiresAt: data.expiresAt,
        provider: data.provider,
        providerAccountId: data.providerAccountId,
        userId: data.userId,
      },
    });
  }

  create(data: ICreateAccount): Promise<DBAccount> {
    return this.createWithClient(this.prisma, data);
  }

  findByUserId(userId: string): Promise<DBAccount | null> {
    return this.prisma.account.findUnique({
      where: { userId },
      include: { user: true },
    });
  }
}
