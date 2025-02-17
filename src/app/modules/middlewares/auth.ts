/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import { NextFunction, Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import AppError from '../../errors/AppError';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../../config';
import { TUserRole } from '../auth/auth.interface';
import { verifyToken } from '../auth/auth.utils';
import { User } from '../user/user.model';
const auth = (...requiredRole: TUserRole[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;
    if (!token) {
      throw new AppError(401, 'You are not authorized !');
    }
    const decoded = verifyToken(token, config.jwt_access_secret as string);

    const { role, email } = decoded;
    req.user = decoded;
    const user = await User.findOne({ email: email });
    if (!user) {
      throw new AppError(404, 'User does not exist');
    }
    const isUserDeleted = user?.isDeleted;
    if (isUserDeleted) {
      throw new AppError(401, 'User does not available');
    }
    if (user?.status === 'blocked') {
      throw new AppError(409, 'User is blocked');
    }

    // if (
    //   user?.passwordChangedAt &&
    //   User.isJwtIssuedBeforeChangePassword(
    //     user?.passwordChangedAt,
    //     iat as number,
    //   )
    // ) {
    //   throw new AppError(401, 'You are not authorized');
    // }

    if (requiredRole && !requiredRole.includes(role)) {
      throw new AppError(401, 'You are not authorized');
    }
    next();
  });
};
export default auth;
