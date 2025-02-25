import { Types } from "mongoose";

export type TProduct = {
  name: string;
  brand: string;
  model: string;
  image: string;
  price: number;
  tag?: string;
  type: 'Mountain' | 'Road' | 'Hybrid' | 'BMX' | 'Electric' | 'Kids';
  description: string;
  quantity: number;
  review: Types.ObjectId[];
  inStock: boolean;
  colors: string[];
};
