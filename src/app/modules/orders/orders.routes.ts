import express from 'express';
import { orderControllers } from './orders.controller';
import auth from '../middlewares/auth';
import validateRequest from '../middlewares/validateRequest';
import { createOrderValidationSchema } from './orders.validation';
const router = express.Router();

router.post(
  '/api/orders',
  auth('customer'),
  validateRequest(createOrderValidationSchema),
  orderControllers.createOrder,
);
router.get(
  '/api/orders/verify-payment/:order_id',
  auth('customer'),
  orderControllers.verifyPayment,
);
router.get(
  '/api/orders',
  auth('admin', 'supperAdmin'),
  orderControllers.getAllOrders,
);
router.get(
  '/api/orders/revenue',
  auth('admin', 'supperAdmin'),
  orderControllers.getTotalRevenue,
);
export const orderRoutes = router;
