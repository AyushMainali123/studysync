import { PrismaClient } from '@studysync/db';
import { BaseRepository } from '../base';
import { type DBUser } from '@studysync/types';

interface IUserRepository {
  findAll(): Promise<DBUser[]>;
  findById(id: string): Promise<DBUser | null>;
  create(data: ICreateUser): Promise<DBUser>;
  findByEmail(email: string): Promise<DBUser | null>;
}

interface ICreateUser extends Pick<DBUser, 'name' | 'email'> {}

export class UserRepository extends BaseRepository implements IUserRepository {
  async findAll(): Promise<DBUser[]> {
    return this.prisma.user.findMany();
  }

  async findById(id: string): Promise<DBUser | null> {
    return this.prisma.user.findUnique({
      where: { id },
    });
  }

  async createWithClient(client: PrismaClient, data: ICreateUser) {
    return client.user.create({
      data: {
        name: data.name,
        email: data.email,
      },
    });
  }

  async create(data: ICreateUser): Promise<DBUser> {
    return this.createWithClient(this.prisma, data);
  }

  async findByEmail(email: string): Promise<DBUser | null> {
    return this.prisma.user.findUnique({
      where: { email },
    });
  }
}
