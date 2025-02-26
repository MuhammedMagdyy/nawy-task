import asyncHandler from 'express-async-handler';
import { apartmentService } from '../services';
import { CREATED, OK } from '../utils';
import {
  apartmentSchema,
  paramsSchema,
  paginationSchema,
} from '../utils/validations';

export const createApartmentHandler = asyncHandler(async (req, res) => {
  const parsedApartmentData = apartmentSchema.parse(req.body);
  const apartment = await apartmentService.createApartment(parsedApartmentData);

  res.status(CREATED).json({ data: apartment });
});

export const getApartmentsHandler = asyncHandler(async (req, res) => {
  const { pageNumber, pageSize } = paginationSchema.parse(req.query);
  const apartments = await apartmentService.getApartments({
    pageNumber,
    pageSize,
  });

  res.status(OK).json({ data: apartments });
});

export const getApartmentDetailsHandler = asyncHandler(async (req, res) => {
  const { id } = paramsSchema.parse(req.params);
  const apartment = await apartmentService.getApartmentDetails(id);

  res.status(OK).json({ data: apartment });
});
