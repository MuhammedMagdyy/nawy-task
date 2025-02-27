import { IFilterBuilder, IPagination, IPaginationQuery } from '../interfaces';
import { ApartmentWhereInput } from '../types/prisma';

export class ApartmentFilterBuilder
  implements IFilterBuilder<ApartmentWhereInput>
{
  private filters: { AND?: Array<ApartmentWhereInput> } = { AND: [] };
  private hasFilters = false;
  private pagination: IPagination | null = null;

  withTextSearch(filterOptions: {
    unitName?: string;
    unitNumber?: string;
    project?: string;
  }): this {
    const textFilters: ApartmentWhereInput[] = [];

    if (filterOptions.unitName) {
      textFilters.push({
        name: { contains: filterOptions.unitName.trim() },
      });
    }

    if (filterOptions.unitNumber) {
      textFilters.push({
        unitNumber: { contains: filterOptions.unitNumber.trim() },
      });
    }

    if (filterOptions.project) {
      textFilters.push({
        project: { contains: filterOptions.project.trim() },
      });
    }

    if (textFilters.length > 0 && this.filters.AND) {
      this.filters.AND.push({ OR: textFilters });
      this.hasFilters = true;
    }

    return this;
  }

  withPriceRange(options: { minPrice?: number; maxPrice?: number }): this {
    const priceFilter: { gte?: number; lte?: number } = {};

    if (options.minPrice !== undefined && options.minPrice !== 0) {
      priceFilter.gte = options.minPrice;
    }

    if (options.maxPrice !== undefined && options.maxPrice !== 0) {
      priceFilter.lte = options.maxPrice;
    }

    if (Object.keys(priceFilter).length > 0 && this.filters.AND) {
      this.filters.AND.push({ price: priceFilter });
      this.hasFilters = true;
    }

    return this;
  }

  withPagination(paginationQuery: IPaginationQuery): this {
    const skip = (paginationQuery.pageNumber - 1) * paginationQuery.pageSize;
    const take = paginationQuery.pageSize;
    this.pagination = { skip, take };
    return this;
  }

  build() {
    if (!this.hasFilters) {
      return { ...this.pagination };
    }

    if (this.filters.AND && this.filters.AND.length === 0) {
      delete this.filters.AND;
    }

    return {
      ...this.filters,
      ...this.pagination,
    };
  }
}
