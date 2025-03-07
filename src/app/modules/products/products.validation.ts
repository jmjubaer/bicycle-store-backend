import { z } from 'zod';

export const createProductValidationSchema = z.object({
  body: z.object({
    name: z.string({ required_error: 'Name is required' }),
    brand: z.string({ required_error: 'Brand is required' }),
    model: z.string({ required_error: 'Model is required' }),
    image: z.string({ required_error: 'Product image is required' }),
    price: z.number().positive('Price must be a positive number'),
    type: z.enum(['Mountain', 'Road', 'Hybrid', 'BMX', 'Electric', 'Kids'], {
      message: '{VALUE} is an invalid type',
    }),
    description: z.string({ required_error: 'Description is required' }), // Description should not be empty
    quantity: z
      .number()
      .int()
      .nonnegative('Quantity must be a positive number'), // Ensures quantity is a non-negative integer
    inStock: z.boolean().default(true),
    colors: z.array(z.string()).nonempty('At least one color is required'),
  }),
});

export const updateProductValidationSchema = z.object({
  body: z.object({
    price: z.number().positive('Price must be a positive number'),

    quantity: z
      .number()
      .int()
      .nonnegative('Quantity must be a positive number'), // Ensures quantity is a non-negative integer
  }),
});
