import { z } from 'zod';

export const ProductValidationSchema = z.object({
  name: z.string({ required_error: 'Name is required' }),
  brand: z.string({ required_error: 'Brand is required' }),
  model: z.string({ required_error: 'Model is required' }),
  image: z.string({ required_error: 'Product image is required' }),
  price: z.number().positive('Price must be a positive number'),
  type: z.enum(['Mountain', 'Road', 'Hybrid', 'BMX', 'Electric'], {
    message: '{VALUE} is an invalid type',
  }),
  description: z.string({ required_error: 'Description is required' }), // Description should not be empty
  quantity: z.number().int().nonnegative('Quantity must be a positive number'), // Ensures quantity is a non-negative integer
  inStock: z.boolean().default(true),
});

export default ProductValidationSchema;
