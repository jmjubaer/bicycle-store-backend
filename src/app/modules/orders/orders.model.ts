import { model, Schema } from 'mongoose';
import { TOrder } from './orders.interface';

const orderSchema = new Schema<TOrder>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'User is required'],
    },
    product: {
      type: Schema.Types.ObjectId,
      ref: 'Product',
      required: [true, 'Product is required'],
    },
    deliveryInfo: {
      name: { type: String, required: true, trim: true },
      phoneNumber: { type: String, required: true, trim: true },
      localAddress: { type: String, required: true, trim: true },
      city: { type: String, required: true, trim: true },
      district: { type: String, required: true, trim: true },
      thana: { type: String, required: true, trim: true },
      postalCode: { type: String, required: true, trim: true, minlength: 4 },
    },
    quantity: { type: Number, required: [true, 'Quantity is required'] },
    totalPrice: { type: Number, required: [true, 'Total Price is required'] },
    paymentStatus: {
      type: String,
      enum: ['unpaid', 'paid',],
      default: 'unpaid',
    },
    status: {
      type: String,
      enum: ['pending', 'processing', 'shipped', 'delivered', 'cancelled'],
      default: 'pending',
    },
    transaction: {
      id: String,
      transactionStatus: String,
      bank_status: String,
      sp_code: String,
      sp_message: String,
      method: String,
      date_time: String,
    },
  },
  {
    timestamps: true,
  },
);

export const Order = model<TOrder>('Order', orderSchema);
