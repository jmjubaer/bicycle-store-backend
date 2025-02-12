import { model, Schema } from 'mongoose';
import { TOrder } from './orders.interface';

const orderSchema = new Schema<TOrder>({
  email: { type: String, required: [true, 'Email is required'] },
  product: { type: String, required: [true, 'Product is required'] },
  quantity: { type: Number, required: [true, 'Quantity is required'] },
  totalPrice: { type: Number, required: [true, 'TotalPrice is required'] },
  createdAt: { type: Date },
  updatedAt: { type: Date, timestamps: true },
});

export const Orders = model<TOrder>('Order', orderSchema);
