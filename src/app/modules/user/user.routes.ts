import express from 'express';
import { userControllers } from './user.controller';
import validateRequest from '../middlewares/validateRequest';
import { createUserValidationSchema } from './user.validation.';
const router = express.Router();

// create product routes for add products into database
router.post('/api/users',validateRequest(createUserValidationSchema), userControllers.createUser);
router.get('/api/users', userControllers.getAllUser);

export const userRoutes = router;
