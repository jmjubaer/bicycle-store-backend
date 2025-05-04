import express from 'express';
import { categoryControllers } from './category.controller';
import validateRequest from '../middlewares/validateRequest';
import { createCategoryValidationSchema } from './category.validation';
const router = express.Router();

// create product routes for add products into database
router.post(
  '/category',
  //   auth('admin', 'supperAdmin'),
    validateRequest(createCategoryValidationSchema),
  categoryControllers.createCategory,
);
// routes for get products
router.get('/categories', categoryControllers.getAllCategories);

export const categoryRoutes = router;
