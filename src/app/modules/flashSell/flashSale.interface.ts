import { Types } from 'mongoose';

export interface TFlashSale {
  product: Types.ObjectId;
  discountPercentage: number;
}
export interface TAddFlashSale {
  product: Types.ObjectId[];
  discountPercentage: number;
}
