import express from 'express';
import { orderControllers } from './orders.controller';
import auth from '../middlewares/auth';
import validateRequest from '../middlewares/validateRequest';
import { changeOrderStatusSchema, createOrderValidationSchema } from './orders.validation';
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
router.delete(
  '/api/orders/:order_id',
  auth('admin', 'supperAdmin'),
  orderControllers.deleteOrder,
);
router.get(
  '/api/orders',
  auth('admin', 'supperAdmin'),
  orderControllers.getAllOrders,
);
router.patch(
  '/api/orders/change-status/:id',
  auth('admin', 'supperAdmin'),
  validateRequest(changeOrderStatusSchema),
  orderControllers.changeOrderStatus,
);
router.get(
  '/api/orders/revenue',
  auth('admin', 'supperAdmin'),
  orderControllers.getTotalRevenue,
);
export const orderRoutes = router;
