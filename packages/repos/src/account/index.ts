import { OAuthProvider, PrismaClient } from '@studysync/db';
import { BaseRepository } from '../base';
import { type DBAccount } from '@studysync/types';
import { OAuthProviders } from '@/enums/oauth-providers';

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

  findByProviderAccountId(
    provider: OAuthProviders,
    accountId: string,
    user?: boolean
  ) {
    return this.prisma.account.findFirst({
      where: { provider, providerAccountId: accountId },
      include: { user: user ?? true },
    });
  }

  updateAccessTokenUsingProvider(
    providerAccountId: string,
    provider: OAuthProvider,
    accessToken: string,
    expiresAt: Date
  ) {
    return this.prisma.account.update({
      where: { provider_providerAccountId: { provider, providerAccountId } },
      data: { accessToken, expiresAt: expiresAt },
    });
  }

  updateRefreshTokenUsingProvider(
    providerAccountId: string,
    provider: OAuthProvider,
    refreshToken: string
  ) {
    return this.prisma.account.update({
      where: { provider_providerAccountId: { provider, providerAccountId } },
      data: { refreshToken },
    });
  }
}
