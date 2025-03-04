import express from 'express';
import { userControllers } from './user.controller';
import validateRequest from '../middlewares/validateRequest';
import {
  createUserValidationSchema,
  roleChangeValidationSchema,
  statusChangeValidationSchema,
  userNameChangeValidationSchema,
} from './user.validation.';
import auth from '../middlewares/auth';
const router = express.Router();

// create product routes for add products into database
router.post(
  '/users',
  validateRequest(createUserValidationSchema),
  userControllers.createUser,
);
router.get('/users', auth('admin', 'supperAdmin'), userControllers.getAllUser);
router.post(
  '/users/change-role/:email',
  auth('admin', 'supperAdmin'),
  validateRequest(roleChangeValidationSchema),
  userControllers.changeRole,
);
router.post(
  '/users/change-status/:email',
  auth('admin', 'supperAdmin'),
  validateRequest(statusChangeValidationSchema),
  userControllers.changeStatus,
);
router.get(
  '/user/me',
  auth('admin', 'customer', 'supperAdmin'),
  userControllers.getMe,
);
router.patch(
  '/user/update-name',
  validateRequest(userNameChangeValidationSchema),
  auth('admin', 'customer', 'supperAdmin'),
  userControllers.updateUserName,
);

export const userRoutes = router;
