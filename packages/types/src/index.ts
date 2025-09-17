import { type PrismaClient } from '@studysync/db';

export type DBUser = NonNullable<
  Awaited<ReturnType<PrismaClient['user']['findUnique']>>
>;
export type DBAccount = NonNullable<
  Awaited<ReturnType<PrismaClient['account']['findUnique']>>
>;
export type DBWorkspace = NonNullable<
  Awaited<ReturnType<PrismaClient['workspace']['findUnique']>>
>;

export type DBStorageItem = NonNullable<
  Awaited<ReturnType<PrismaClient['storageItem']['findUnique']>>
>;

export type DBWorkspaceMember = NonNullable<
  Awaited<ReturnType<PrismaClient['workspaceMember']['findUnique']>>
>;
