import express from 'express';
import validateRequest from '../middlewares/validateRequest';
import { loginValidationSchema } from './auth.validation';
import { authControllers } from './auth.controller';
const router = express.Router();

// create product routes for add products into database
router.post(
  '/api/auth/login',
  validateRequest(loginValidationSchema),
  authControllers.loginUser,
);
// router.get('/api/users', userControllers.getAllUser);

export const authRoutes = router;
