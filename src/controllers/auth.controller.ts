import asyncHandler from 'express-async-handler';
import { authService } from '../services';
import { registerSchema, CREATED, loginSchema, OK } from '../utils';

export const processUserRegistration = asyncHandler(async (req, res) => {
  const { name, email, password } = registerSchema.parse(req.body);

  const user = await authService.register({ name, email, password });

  res.status(CREATED).json({ message: 'Registered successfully', data: user });
});

export const processUserLogin = asyncHandler(async (req, res) => {
  const { email, password } = loginSchema.parse(req.body);

  const user = await authService.login({ email, password });

  res.status(OK).json({ message: 'Logged in successfully', data: user });
});
