import { Schema, model } from 'mongoose';
import { TCategory } from './category.interface';

const productSchema = new Schema<TCategory>(
  {
    name: { type: String, required: true, trim: true },
    key: { type: String, required: true, trim: true },
    image: { type: String, required: true },
  },
  {
    timestamps: true,
  },
);

export const Category = model<TCategory>('category', productSchema);
