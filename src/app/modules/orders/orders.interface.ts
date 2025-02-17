import { Types } from 'mongoose';

export type TOrder = {
  _id: Types.ObjectId;
  user: Types.ObjectId;
  product: Types.ObjectId;
  quantity: number;
  totalPrice: number;
  transaction: {
    id: string;
    transactionStatus: string;
    bank_status: string;
    sp_code: string;
    sp_message: string;
    method: string;
    date_time: string;
  };
  paymentStatus: 'pending' | 'paid' | 'cancelled';
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
};
