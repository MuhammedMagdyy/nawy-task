import { z } from 'zod';

export const apartmentSchema = z.object({
  name: z
    .string()
    .min(3, 'Name must be at least 3 characters long')
    .toLowerCase(),
  unitNumber: z.string().min(1, 'Unit number is required'),
  project: z
    .string()
    .min(3, 'Project name must be at least 3 characters long')
    .toLowerCase(),
  price: z.number().int().positive('Price must be a positive integer'),
  location: z.string().min(3, 'Location must be at least 3 characters long'),
  description: z
    .string()
    .min(3, 'Description must be at least 3 characters long'),
  imageUrl: z.string().url('Invalid image URL'),
});
