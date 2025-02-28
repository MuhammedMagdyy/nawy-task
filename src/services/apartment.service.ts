import { Prisma } from '@prisma/client';
import { apartmentRepository, ApartmentRepository } from '../repositories';
import { ApiError, NOT_FOUND } from '../utils';
import { IFilterQuery, IPaginationQuery } from '../interfaces';

export class ApartmentService {
  constructor(private readonly apartmentRepository: ApartmentRepository) {}

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
      throw new ApiError('Apartment not found', NOT_FOUND);
    }

    return apartment;
  }
}

export const apartmentService = new ApartmentService(apartmentRepository);
