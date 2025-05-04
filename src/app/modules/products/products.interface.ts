import { Types } from 'mongoose';

export type TProduct = {
  name: string;
  brand: string;
  model: string;
  image: string;
  price: number;
  tag?: string;
  category: string;
  description: string;
  quantity: number;
  reviews?: Types.ObjectId[];
  inStock: boolean;
  colors: string[];
};
