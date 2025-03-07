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
  const { order_id } = req.query;
  const result = await orderService.verifyPayment(order_id as string);
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
  const result = await orderService.getAllOrdersFromDb(req.query);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Get all order successfully',
    data: result.data,
    meta: result.meta,
  });
});

const getMyOrders = catchAsync(async (req, res) => {
  const { email } = req.user;
  const result = await orderService.getMyOrdersFromDb(email);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Get all my order successfully',
    data: result,
  });
});

const deleteOrder = catchAsync(async (req, res) => {
  const result = await orderService.deleteOrderFromDb(req.params.order_id);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Delete order successfully',
    data: result,
  });
});
const changeOrderStatus = catchAsync(async (req, res) => {
  const id = req.params.id;
  const status = req.body.status;
  const result = await orderService.changeOrderStatusIntoDB(id, status);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Change order successfully',
    data: result,
  });
});
export const orderControllers = {
  createOrder,
  getTotalRevenue,
  verifyPayment,
  getAllOrders,
  getMyOrders,
  deleteOrder,
  changeOrderStatus,
};
