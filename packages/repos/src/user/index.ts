import { PrismaClient } from "@studysync/db";
import { IBaseRepository } from "../base";
import { type DBUser } from "@studysync/types";

interface IUserRepository extends IBaseRepository<DBUser> {}

export class UserRepository implements IUserRepository {
    private prisma: PrismaClient;

    constructor(client: PrismaClient) {
        this.prisma = client;
    }
    async findAll(): Promise<DBUser[]> {
       return this.prisma.user.findMany();
    }

    async findById(id: string): Promise<DBUser | null> {
        return this.prisma.user.findUnique({
            where: { id }
        });
    }
}