import express from 'express';
import { productControllers } from './products.controller';
import auth from '../middlewares/auth';
import validateRequest from '../middlewares/validateRequest';
import {
  createProductValidationSchema,
  updateProductValidationSchema,
} from './products.validation';
const router = express.Router();

// create product routes for add products into database
router.post(
  '/api/products',
  auth('admin', 'supperAdmin'),
  validateRequest(createProductValidationSchema),
  productControllers.createProduct,
);
// routes for get products
router.get('/api/products', productControllers.getAllProducts);
//  routes for get single data
router.get('/api/products/:productId', productControllers.getSingleProducts);
// routes for update product
router.put(
  '/api/products/:productId',
  auth('admin', 'supperAdmin'),
  validateRequest(updateProductValidationSchema),
  productControllers.updateProduct,
);
// routes for delete product
router.delete(
  '/api/products/:productId',
  auth('admin', 'supperAdmin'),
  productControllers.deleteProduct,
);

export const productRoutes = router;
