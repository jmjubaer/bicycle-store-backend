import express from 'express';
import { userControllers } from './user.controller';
const router = express.Router();

// create product routes for add products into database
router.post('/api/users', userControllers.createUser);
router.get('/api/users', userControllers.getAllUser);

export const userRoutes = router;
