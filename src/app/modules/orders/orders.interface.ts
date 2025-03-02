import { Types } from 'mongoose';
export type TDeliveryAddress = {
  name: string;
  phoneNumber: string;
  localAddress: string;
  city: string;
  district: string;
  thana: string;
  postalCode: number;
};
export type TOrder = {
  _id: Types.ObjectId;
  user: Types.ObjectId;
  product: Types.ObjectId;
  quantity: number;
  totalPrice: number;
  deliveryAddress?: TDeliveryAddress;
  transaction: {
    id: string;
    transactionStatus: string;
    bank_status: string;
    sp_code: string;
    sp_message: string;
    method: string;
    date_time: string;
  };
  paymentMethod: "COD" | "surjopay";
  paymentStatus: 'pending' | 'paid' | 'cancelled';
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
};
