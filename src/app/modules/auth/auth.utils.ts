/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-unused-vars */
import bcrypt from 'bcrypt';
import jwt, { JwtPayload } from 'jsonwebtoken';
import AppError from '../../errors/AppError';
import { number } from 'zod';

export const checkPassword = async (
  password: string,
  hashPassword: string,
): Promise<boolean> => {
  return await bcrypt.compare(password, hashPassword);
};

export const createToken = (
  jwtPayload: { email: string; role: string },
  secret: string,
  expiresIn: string | number,
): string => {
  const token = jwt.sign(jwtPayload, secret, {
    expiresIn: expiresIn as number,
  });
  return token;
};

export const verifyToken = (token: string, secret: string) => {
  try {
    return jwt.verify(token, secret) as JwtPayload;
  } catch (error: any) {
    throw new AppError(401, 'Token is expired');
  }
};
