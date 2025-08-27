import { type PrismaClient } from '@studysync/db';

export type DBUser = NonNullable<
  Awaited<ReturnType<PrismaClient['user']['findUnique']>>
>;
export type DBAccount = NonNullable<
  Awaited<ReturnType<PrismaClient['account']['findUnique']>>
>;
