import { z } from 'zod';

const orderValidationSchema = z.object({
  email: z.string().email('Invalid email format').nonempty('Email is required'),
  product: z.string().nonempty('Product is required'),
  quantity: z
    .number()
    .int('Quantity must be an integer')
    .positive('Quantity must be a positive number')
    .refine((val) => val > 0, { message: 'Quantity is required' }),
  totalPrice: z
    .number()
    .positive('TotalPrice must be a positive number')
    .refine((val) => val > 0, { message: 'TotalPrice is required' }),
  createdAt: z.date().optional(), // Optional string
  updatedAt: z.date().optional(), // Optional string
});

export default orderValidationSchema;
