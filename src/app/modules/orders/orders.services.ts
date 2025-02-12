import { Product } from '../products/products.model';
import { TOrder } from './orders.interface';
import { Orders } from './orders.model';
import { ObjectId } from 'mongodb';
import orderValidationSchema from './orders.validation';
// add order into database
const createOrderIntoDb = async (order: TOrder) => {
  const productData = await Product.findOne({
    _id: new ObjectId(order.product),
  });
  // throw error if product is not found
  if (!productData) {
    throw new Error('Product not found');
  }
  // throw error if product is not available in stock or less than ordered quantity
  if (productData.quantity < order.quantity || productData.inStock === false) {
    throw new Error('Insufficient stock, product is not available');
  }
  // reduce the product quantity
  const restProductQuantity = productData.quantity - order.quantity;
  if (restProductQuantity === 0) {
    await Product.updateOne(
      { _id: new ObjectId(order.product) },
      { quantity: 0, inStock: false },
    );
  } else {
    await Product.updateOne(
      { _id: new ObjectId(order.product) },
      { quantity: restProductQuantity },
    );
  }
  const zodParseData = orderValidationSchema.parse({
    ...order,
    createdAt: new Date(),
    updatedAt: new Date(),
    totalPrice: Number(productData.price * order.quantity),
  });
  const result = await Orders.create(zodParseData);
  return result;
};

// add order into database
const calculateRevenueFromOrder = async () => {
  const totalRevenue = await Orders.aggregate([
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
  calculateRevenueFromOrder,
};
