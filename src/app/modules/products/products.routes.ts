import express from 'express';
import { productControllers } from './products.controller';
const router = express.Router();

// create product routes for add products into database
router.post('/api/products', productControllers.createProduct);
// routes for get products
router.get('/api/products', productControllers.getAllProducts);
//  routes for get single data
router.get('/api/products/:productId', productControllers.getSingleProducts);
// routes for update product
router.put('/api/products/:productId', productControllers.updateProduct);
// routes for delete product
router.delete('/api/products/:productId', productControllers.deleteProduct);

export const productRoutes = router;
