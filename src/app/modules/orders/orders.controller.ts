import { orderService } from './orders.services';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';

// create Order controller
const createOrder = catchAsync(async (req, res) => {
  const order = req.body;

  const result = await orderService.createOrderIntoDb(order, req.ip!);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Order created successfully',
    data: result,
  });
});
const verifyPayment = catchAsync(async (req, res) => {
  const { order_id } = req.params;
  const result = await orderService.verifyPayment(order_id);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Payment verify successfully',
    data: result,
  });
});

// create Order controller
const getTotalRevenue = catchAsync(async (req, res) => {
  const result = await orderService.calculateRevenueFromOrder();
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Revenue calculated successfully',
    data: result,
  });
});
const getAllOrders = catchAsync(async (req, res) => {
  const result = await orderService.getAllOrders();
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Get all order successfully',
    data: result,
  });
});
export const orderControllers = {
  createOrder,
  getTotalRevenue,
  verifyPayment,
  getAllOrders,
};
