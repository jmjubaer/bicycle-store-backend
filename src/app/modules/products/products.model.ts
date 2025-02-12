import { Schema, model } from 'mongoose';
import { TProduct } from './products.interface';

const productSchema = new Schema<TProduct>({
  name: { type: String, required: true, trim: true },
  brand: { type: String, required: true, trim: true },
  price: { type: Number, required: true },
  type: {
    type: String,
    enum: ['Mountain', 'Road', 'Hybrid', 'BMX', 'Electric'],
    required: true,
  },
  description: { type: String, required: true },
  quantity: { type: Number, required: true },
  inStock: { type: Boolean, required: true, default: true },
  createdAt: { type: Date },
  updatedAt: { type: Date, timestamps: true },
  // Automatically adds createdAt and updatedAt fields
});

export const Product = model<TProduct>('Product', productSchema);
