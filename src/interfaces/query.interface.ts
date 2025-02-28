import { PrismaWhereInput } from '../types/prisma';

export interface IPagination {
  skip: number;
  take: number;
}

export interface IPaginationQuery {
  pageNumber: number;
  pageSize: number;
}

export interface IFilterQuery {
  unitName?: string;
  unitNumber?: string;
  project?: string;
  minPrice?: number;
  maxPrice?: number;
}

export interface IFilterBuilder<T extends PrismaWhereInput> {
  build(): T & Partial<IPagination>;
}
