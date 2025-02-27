import { Prisma, PrismaClient } from '@prisma/client';
import { prismaClient } from '../config';

export class UserRepository {
  constructor(private readonly prismaClient: PrismaClient) {}

  async createOne(data: Prisma.UserUncheckedCreateInput) {
    return this.prismaClient.user.create({ data });
  }

  async findOne(where: Prisma.UserWhereUniqueInput) {
    return this.prismaClient.user.findUnique({ where });
  }
}

export const userRepository = new UserRepository(prismaClient.getClient());
