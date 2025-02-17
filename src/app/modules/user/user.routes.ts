import express from 'express';
import { userControllers } from './user.controller';
import validateRequest from '../middlewares/validateRequest';
import {
  createUserValidationSchema,
  roleChangeValidationSchema,
  statusChangeValidationSchema,
} from './user.validation.';
import auth from '../middlewares/auth';
const router = express.Router();

// create product routes for add products into database
router.post(
  '/api/users',
  validateRequest(createUserValidationSchema),
  userControllers.createUser,
);
router.get(
  '/api/users',
  auth('admin', 'supperAdmin'),
  userControllers.getAllUser,
);
router.post(
  '/api/users/change-role/:email',
  auth('admin', 'supperAdmin'),
  validateRequest(roleChangeValidationSchema),
  userControllers.changeRole,
);
router.post(
  '/api/users/change-status/:email',
  auth('admin', 'supperAdmin'),
  validateRequest(statusChangeValidationSchema),
  userControllers.changeStatus,
);
router.get(
  '/api/users/me',
  auth('admin', 'customer', 'supperAdmin'),
  userControllers.getMe,
);

export const userRoutes = router;
