import express from 'express';
import { orderControllers } from './order.controller';
const router = express.Router();

router.post('/api/orders', orderControllers.createOrder);
router.get('/api/orders/revenue', orderControllers.getTotalRevenue);
export const orderRoutes = router;
