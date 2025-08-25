import { type PrismaClient } from '@studysync/db';

export type DBUser = Awaited<ReturnType<PrismaClient['user']['findUnique']>>;
