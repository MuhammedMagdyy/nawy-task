import { Prisma, PrismaClient } from '@prisma/client';
import { prismaClient } from '../config';
import { IFilterQuery, IPaginationQuery } from '../interfaces';
import { ApartmentFilterBuilder } from '../utils';

export class ApartmentRepository {
  constructor(private readonly prismaClient: PrismaClient) {}

  async createApartment(data: Prisma.ApartmentUncheckedCreateInput) {
    return this.prismaClient.apartment.create({ data });
  }

  async getApartments(
    paginationOptions: IPaginationQuery,
    filterOptions: IFilterQuery
  ) {
    const apartmentFilterBuilder = new ApartmentFilterBuilder()
      .withTextSearch({
        unitName: filterOptions.unitName,
        unitNumber: filterOptions.unitNumber,
        project: filterOptions.project,
      })
      .withPriceRange({
        minPrice: filterOptions.minPrice,
        maxPrice: filterOptions.maxPrice,
      })
      .withPagination(paginationOptions);

    const { skip, take, ...where } = apartmentFilterBuilder.build();
    return this.prismaClient.apartment.findMany({
      where,
      skip,
      take,
      orderBy: { createdAt: 'desc' },
    });
  }

  async getApartment(id: number) {
    return this.prismaClient.apartment.findUnique({ where: { id } });
  }
}

export const apartmentRepository = new ApartmentRepository(
  prismaClient.getClient()
);
