import express from 'express';
import validateRequest from '../middlewares/validateRequest';
import {
  changePasswordValidationSchema,
  loginValidationSchema,
} from './auth.validation';
import { authControllers } from './auth.controller';
import auth from '../middlewares/auth';
const router = express.Router();

// create product routes for add products into database
router.post(
  '/api/auth/login',
  validateRequest(loginValidationSchema),
  authControllers.loginUser,
);
router.post(
  '/api/auth/changePassword',
  auth('customer', 'admin'),
  validateRequest(changePasswordValidationSchema),
  authControllers.changePassword,
);
// router.get('/api/users', userControllers.getAllUser);

export const authRoutes = router;
