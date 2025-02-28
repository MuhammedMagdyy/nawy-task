import asyncHandler from 'express-async-handler';
import { apartmentService, cloudinaryService } from '../services';
import {
  apartmentSchema,
  paramsSchema,
  paginationSchema,
  ApiError,
  BAD_REQUEST,
  CREATED,
  OK,
} from '../utils';
import { IFilterQuery } from '../interfaces';

export const createApartmentHandler = asyncHandler(async (req, res) => {
  if (!req.file) {
    throw new ApiError('Please upload an image', BAD_REQUEST);
  }

  const { image } = await cloudinaryService.uploadImage(req.file.path);

  const parsedBody = JSON.parse(req.body.data);

  const parsedApartmentData = apartmentSchema.parse({
    ...parsedBody,
    imageUrl: image,
  });
  const apartment = await apartmentService.createApartment(parsedApartmentData);

  res.status(CREATED).json({ data: apartment });
});

export const getApartmentsHandler = asyncHandler(async (req, res) => {
  const { unitName, unitNumber, project, minPrice, maxPrice } =
    req.query as IFilterQuery;
  const { pageNumber, pageSize } = paginationSchema.parse(req.query);
  const apartments = await apartmentService.getApartments(
    {
      pageNumber,
      pageSize,
    },
    {
      unitName,
      unitNumber,
      project,
      minPrice: minPrice ? +minPrice : undefined,
      maxPrice: maxPrice ? +maxPrice : undefined,
    }
  );

  res.status(OK).json({ data: apartments });
});

export const getApartmentDetailsHandler = asyncHandler(async (req, res) => {
  const { id } = paramsSchema.parse(req.params);
  const apartment = await apartmentService.getApartmentDetails(id);

  res.status(OK).json({ data: apartment });
});
