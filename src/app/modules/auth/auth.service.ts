import { JwtPayload } from 'jsonwebtoken';
import config from '../../config';
import AppError from '../../errors/AppError';
import { User } from '../user/user.model';
import { TChangePassword, TLoginUser } from './auth.interface';
import {
  checkPassword,
  createToken,
  isJwtIssuedBeforeChangePassword,
  verifyToken,
} from './auth.utils';
import bcrypt from 'bcrypt';
const loginUser = async (payload: TLoginUser) => {
  const user = await User.findOne({ email: payload.email }).select('+password');
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

  const isPasswordMatched = await checkPassword(
    payload?.password,
    user?.password,
  );
  if (!isPasswordMatched) {
    throw new AppError(403, 'Incorrect password');
  }

  const jwtPayload = {
    email: user?.email,
    role: user?.role,
  };

  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    '7d',
  );
  const refreshToken = createToken(
    jwtPayload,
    config.jwt_refresh_secret as string,
    '30d',
  );

  return {
    accessToken,
    refreshToken,
  };
};
const changePassword = async (
  userData: JwtPayload,
  payload: TChangePassword,
) => {
  const user = await User.findOne({ email: userData.email }).select(
    '+password',
  );
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

  const isPasswordMatched = await checkPassword(
    payload?.oldPassword,
    user?.password,
  );

  if (!isPasswordMatched) {
    throw new AppError(403, 'Incorrect password');
  }

  if (payload?.oldPassword === payload.newPassword) {
    throw new AppError(403, 'Password is same as old password');
  }
  const hashedPassword = await bcrypt.hash(
    payload?.newPassword,
    Number(config.bcrypt_salt_round),
  );
  const result = await User.findOneAndUpdate(
    { email: user?.email, role: user?.role },
    {
      password: hashedPassword,
      passwordChangedAt: new Date(),
    },
  );

  return result
    ? { message: 'Password changed successfully' }
    : { message: 'Something went wrong' };
};
const getAccessTokenByRefreshToken = async (token: string) => {
  const decoded = verifyToken(token, config.jwt_refresh_secret as string);
  const { email, iat } = decoded;

  const user = await User.findOne({ email });
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

  if (
    user?.passwordChangedAt &&
    isJwtIssuedBeforeChangePassword(user?.passwordChangedAt, iat as number)
  ) {
    throw new AppError(401, 'You are not authorized');
  }
  const jwtPayload = {
    email: user?.email,
    role: user?.role,
  };

  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_token_duration as string,
  );
  return { accessToken };
};
export const authServices = {
  loginUser,
  changePassword,
  getAccessTokenByRefreshToken,
};
