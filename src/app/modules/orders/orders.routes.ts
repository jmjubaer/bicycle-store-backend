import express from 'express';
import { orderControllers } from './orders.controller';
import auth from '../middlewares/auth';
import validateRequest from '../middlewares/validateRequest';
import {
  changeOrderStatusSchema,
  createOrderValidationSchema,
} from './orders.validation';
const router = express.Router();

router.post(
  '/orders',
  auth('customer'),
  validateRequest(createOrderValidationSchema),
  orderControllers.createOrder,
);
router.get(
  '/orders/verify-payment',
  auth('customer'),
  orderControllers.verifyPayment,
);
router.delete(
  '/orders/:order_id',
  auth('admin', 'supperAdmin'),
  orderControllers.deleteOrder,
);
router.get(
  '/orders',
  auth('admin', 'supperAdmin'),
  orderControllers.getAllOrders,
);
router.get('/my-orders', auth('customer'), orderControllers.getMyOrders);
router.patch(
  '/orders/change-status/:id',
  auth('admin', 'supperAdmin'),
  validateRequest(changeOrderStatusSchema),
  orderControllers.changeOrderStatus,
);
router.get(
  '/orders/revenue',
  // auth('admin', 'supperAdmin'),
  orderControllers.getTotalRevenue,
);
export const orderRoutes = router;
