import express from 'express';
import validateRequest from '../middlewares/validateRequest';
import {
  changePasswordValidationSchema,
  loginValidationSchema,
  refreshTokenValidationSchema,
} from './auth.validation';
import { authControllers } from './auth.controller';
import auth from '../middlewares/auth';
const router = express.Router();

// create product routes for add products into database
router.post(
  '/auth/login',
  validateRequest(loginValidationSchema),
  authControllers.loginUser,
);
router.post(
  '/auth/change-password',
  auth('customer', 'admin', 'supperAdmin'),
  validateRequest(changePasswordValidationSchema),
  authControllers.changePassword,
);
router.get(
  '/auth/refresh-token',
  validateRequest(refreshTokenValidationSchema),
  authControllers.refreshToken,
);

export const authRoutes = router;
