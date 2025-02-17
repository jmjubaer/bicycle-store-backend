import { z } from 'zod';

export const createOrderValidationSchema = z.object({
  body: z.object({
    user: z.string({ required_error: 'User is required' }),
    product: z.string({ required_error: 'Product is required' }),
    quantity: z
      .number()
      .int('Quantity must be an integer')
      .positive('Quantity must be a positive number')
      .refine((val) => val > 0, { message: 'Quantity is required' }),
    totalPrice: z
      .number()
      .positive('TotalPrice must be a positive number')
      .refine((val) => val > 0, { message: 'TotalPrice is required' }),
  }), // Optional string
});

