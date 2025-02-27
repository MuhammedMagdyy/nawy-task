import { Prisma } from '@prisma/client';
import { apartmentRepo, apartmentRepository } from '../repositories';
import { ApiError } from '../utils';
import { IFilterQuery, IPaginationQuery } from '../interfaces';

export class ApartmentService {
  constructor(private readonly apartmentRepository: apartmentRepository) {}

  async createApartment(data: Prisma.ApartmentUncheckedCreateInput) {
    return this.apartmentRepository.createApartment(data);
  }

  async getApartments(
    paginationOptions: IPaginationQuery,
    filterOptions: IFilterQuery
  ) {
    return this.apartmentRepository.getApartments(
      paginationOptions,
      filterOptions
    );
  }

  async getApartment(id: number) {
    return this.apartmentRepository.getApartment(id);
  }

  async getApartmentDetails(id: number) {
    const apartment = await this.getApartment(id);

    if (!apartment) {
      throw new ApiError('Apartment not found', 404);
    }

    return apartment;
  }
}

export const apartmentService = new ApartmentService(apartmentRepo);
