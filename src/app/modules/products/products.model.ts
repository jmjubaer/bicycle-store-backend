import { Schema, model } from 'mongoose';
import { TProduct } from './products.interface';

const productSchema = new Schema<TProduct>(
  {
    name: { type: String, required: true, trim: true },
    brand: { type: String, required: true, trim: true },
    model: { type: String, required: true, trim: true },
    image: { type: String, required: true },
    price: { type: Number, required: true },
    type: {
      type: String,
      enum: ['Mountain', 'Road', 'Hybrid', 'BMX', 'Electric', 'Kids'],
      required: true,
    },
    tag: { type: String },
    review: [{ type: Schema.Types.ObjectId, ref: 'Review' }],
    description: { type: String, required: true },
    quantity: { type: Number, required: true },
    inStock: { type: Boolean, required: true, default: true },
    colors: { type: [String], required: true },
  },
  {
    timestamps: true,
  },
);

export const Product = model<TProduct>('Product', productSchema);
