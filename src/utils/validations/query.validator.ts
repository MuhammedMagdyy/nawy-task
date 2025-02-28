import { z } from 'zod';

export const paginationSchema = z.object({
  pageNumber: z.coerce.number().default(1),
  pageSize: z.coerce.number().default(10),
});
