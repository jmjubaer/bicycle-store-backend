import { z } from 'zod';

export const createOrderValidationSchema = z.object({
  body: z.object({
    user: z.string({ required_error: 'User is required' }),
    product: z.string({ required_error: 'Product is required' }),
    deliveryAddress: z.object({
      name: z.string().min(1, 'Full name is required'),
      phoneNumber: z
        .string()
        .min(10, 'Phone number must be at least 10 digits'),
      localAddress: z.string().min(1, 'Local address is required'),
      city: z.string().min(1, 'City is required'),
      district: z.string().min(1, 'District is required'),
      thana: z.string().min(1, 'Thana is required'),
      postalCode: z
        .number()
        .min(4, 'Postal code must be at least 4 characters'),
    }),
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
export const changeOrderStatusSchema = z.object({
  body: z.object({
    status: z.enum([
      'pending',
      'processing',
      'shipped',
      'delivered',
      'cancelled',
    ]),
  }), // Optional string
});
