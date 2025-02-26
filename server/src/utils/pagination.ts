import { IPagination, IPaginationQuery } from '../interfaces';

export function getPagination({
  pageNumber,
  pageSize,
}: IPaginationQuery): IPagination {
  const skip = (pageNumber - 1) * pageSize;
  const take = pageSize;

  return { skip, take };
}
