import { Prisma, PrismaClient } from '@prisma/client';
import { prismaClient } from '../config';

export class apartmentRepository {
  constructor(private readonly prismaClient: PrismaClient) {}

  async createApartment(data: Prisma.ApartmentUncheckedCreateInput) {
    return this.prismaClient.apartment.create({ data });
  }

  async getApartments() {
    return this.prismaClient.apartment.findMany();
  }

  async getApartment(id: number) {
    return this.prismaClient.apartment.findUnique({ where: { id } });
  }
}

export const apartmentRepo = new apartmentRepository(prismaClient.getClient());
