/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose from 'mongoose';
import { Product } from '../products/products.model';
import { TOrder } from './orders.interface';
import { Order } from './orders.model';
import { ObjectId } from 'mongodb';
import { User } from '../user/user.model';
import AppError from '../../errors/AppError';
import { orderUtils } from './orders.utils';
// add order into database
const createOrderIntoDb = async (order: TOrder, client_ip: string) => {
  const productData = await Product.findOne({
    _id: new ObjectId(order.product),
  });
  // throw error if product is not found
  if (!productData) {
    throw new AppError(404, 'Product not found');
  }
  const user = await User.findById(order.user);
  // throw error if product is not found
  if (!user) {
    throw new AppError(404, 'Product not found');
  }
  // throw error if product is not available in stock or less than ordered quantity
  if (productData.quantity < order.quantity || productData.inStock === false) {
    throw new AppError(406, 'Insufficient stock, product is not available');
  }
  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    // reduce the product quantity
    const restProductQuantity = productData.quantity - order.quantity;
    if (restProductQuantity === 0) {
      await Product.updateOne(
        { _id: new ObjectId(order.product) },
        { quantity: 0, inStock: false },
        { new: true, session },
      );
    } else {
      await Product.updateOne(
        { _id: new ObjectId(order.product) },
        { quantity: restProductQuantity },
        { new: true, session },
      );
    }
    let orderResponse = await Order.create(
      [
        {
          ...order,
        },
      ],
      { session },
    );

    const shurjopayPayload = {
      amount: order.totalPrice,
      order_id: orderResponse[0]._id,
      currency: 'BDT',
      customer_name: user.name,
      customer_address: 'Dhaka,BD',
      customer_email: user.email,
      customer_phone: '01346513',
      customer_city: 'Dhaka',
      client_ip,
    };

    const payment = await orderUtils.makePaymentAsync(shurjopayPayload);

    if (payment?.transactionStatus) {
      orderResponse = await orderResponse[0].updateOne(
        {
          transaction: {
            id: payment.sp_order_id,
            transactionStatus: payment.transactionStatus,
          },
        },
        { session },
      );
    }
    await session.commitTransaction();
    await session.endSession();

    return payment.checkout_url;
  } catch (err: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new AppError(500, err.message);
  }
};
const verifyPayment = async (order_id: string) => {
  const verifiedPayment = await orderUtils.verifyPaymentAsync(order_id);

  if (verifiedPayment.length) {
    await Order.findOneAndUpdate(
      {
        'transaction.id': order_id,
      },
      {
        'transaction.bank_status': verifiedPayment[0].bank_status,
        'transaction.sp_code': verifiedPayment[0].sp_code,
        'transaction.sp_message': verifiedPayment[0].sp_message,
        'transaction.transactionStatus': verifiedPayment[0].transaction_status,
        'transaction.method': verifiedPayment[0].method,
        'transaction.date_time': verifiedPayment[0].date_time,
        paymentStatus:
          verifiedPayment[0].bank_status == 'Success'
            ? 'paid'
            : verifiedPayment[0].bank_status == 'Failed'
              ? 'pending'
              : verifiedPayment[0].bank_status == 'Cancel'
                ? 'cancelled'
                : '',
      },
    );
  }

  return verifiedPayment;
};
const getAllOrders = async () => {
  const data = await Order.find().populate('user product');
  return data;
};
const deleteOrderFromDb = async (id: string) => {
  const result = await Order.findByIdAndDelete(id);
  if (!result) {
    throw new AppError(404, 'Order not found');
  }
  return result;
};

const changeOrderStatusIntoDB = async (id: string, status: string) => {
  const isOrderExist = await Order.findById(id);
  if (!isOrderExist) {
    throw new AppError(404, 'Order not found');
  }
  const result = await Order.findByIdAndUpdate(id, { status }, { new: true });
  return result;
};

const calculateRevenueFromOrder = async () => {
  const totalRevenue = await Order.aggregate([
    {
      // Convert string to ObjectId
      $addFields: {
        productObjectId: { $toObjectId: '$product' },
      },
    },
    // get product data from product collection
    {
      $lookup: {
        from: 'products',
        localField: 'productObjectId',
        foreignField: '_id',
        as: 'productDetails',
      },
    },
    {
      $unwind: '$productDetails',
    },
    {
      $group: {
        // Group all orders together
        _id: null,
        totalRevenue: {
          // Calculate total price for each order
          $sum: {
            $multiply: ['$productDetails.price', '$quantity'],
          },
        },
      },
    },
  ]);
  return totalRevenue[0].totalRevenue;
};

export const orderService = {
  createOrderIntoDb,
  verifyPayment,
  getAllOrders,
  calculateRevenueFromOrder,
  deleteOrderFromDb,
  changeOrderStatusIntoDB,
};
