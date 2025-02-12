/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';
import { orderService } from './orders.services';

// create Order controller
const createOrder = async (req: Request, res: Response) => {
  try {
    const order = req.body;
    // validate the order data by Zod

    const result = await orderService.createOrderIntoDb(order);
    //send the response
    res.status(200).json({
      success: true,
      message: 'Order created successfully',
      data: result,
    });
  } catch (error: any) {
    // throw error when face any errors
    if (error.message === 'Product not found') {
      res.status(404).json({
        success: false,
        message: error.message,
        error: error,
        stack: error.stack,
      });
    } else {
      res.status(500).json({
        success: false,
        message:
          error.name === 'ZodError' ? 'Validation failed' : error.message,
        error: error,
        stack: error.stack,
      });
    }
  }
};
// create Order controller
const getTotalRevenue = async (req: Request, res: Response) => {
  try {
    const result = await orderService.calculateRevenueFromOrder();
    //send the response
    res.status(200).json({
      success: true,
      message: 'Revenue calculated successfully',
      data: result,
    });
  } catch (error: any) {
    // throw error when face any errors
    res.status(500).json({
      success: false,
      message: error.name === 'ZodError' ? 'Validation failed' : error.message,
      error: error,
      stack: error.stack,
    });
  }
};

export const orderControllers = {
  createOrder,
  getTotalRevenue,
};
