import { Prisma, PrismaClient } from '@prisma/client';
import { prismaClient } from '../config';
import { IPaginationQuery } from '../interfaces';
import { getPagination } from '../utils';

export class apartmentRepository {
  constructor(private readonly prismaClient: PrismaClient) {}

  async createApartment(data: Prisma.ApartmentUncheckedCreateInput) {
    return this.prismaClient.apartment.create({ data });
  }

  async getApartments(paginationOptions: IPaginationQuery) {
    return this.prismaClient.apartment.findMany({
      ...getPagination(paginationOptions),
      orderBy: { id: 'desc' },
    });
  }

  async getApartment(id: number) {
    return this.prismaClient.apartment.findUnique({ where: { id } });
  }
}

export const apartmentRepo = new apartmentRepository(prismaClient.getClient());
