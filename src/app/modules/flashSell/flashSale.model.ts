import { Schema, model } from 'mongoose';
import { TFlashSale } from './flashSale.interface';

const flashSaleSchema = new Schema<TFlashSale>(
  {
    product: {
      type: Schema.Types.ObjectId,
      ref: 'Product',
      required: [true, 'Product ID is required'],
    },
    discountPercentage: {
      type: Number,
      required: [true, 'Discount percentage is required'],
      min: 0,
      max: 100,
    },
  },
  { timestamps: true },
);

export const FlashSale = model<TFlashSale>('FlashSale', flashSaleSchema);
