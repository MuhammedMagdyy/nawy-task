import { NextFunction, Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import { Secret, verify } from 'jsonwebtoken';
import { ApiError, FORBIDDEN, UNAUTHORIZED } from '../utils';
import { IJwtPayload } from '../interfaces';
import { userService } from '../services';

export const isAuth = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      throw new ApiError('Invalid token', UNAUTHORIZED);
    }

    const decoded = verify(
      token,
      process.env.ACCESS_TOKEN_SECRET as Secret
    ) as IJwtPayload;

    if (!decoded) {
      throw new ApiError('Invalid token', FORBIDDEN);
    }

    const user = await userService.findUser({ id: decoded.id });

    if (!user) {
      throw new ApiError('You have to verify your email', FORBIDDEN);
    }

    req.user = { id: decoded.id };

    next();
  }
);
