import { z } from 'zod';

export const ProductValidationSchema = z.object({
  name: z.string().nonempty('Name is required'),
  brand: z.string().nonempty('Brand is required'),
  price: z.number().positive('Price must be a positive number'), // Ensures price is a positive number
  type: z.enum(['Mountain', 'Road', 'Hybrid', 'BMX', 'Electric'], {
    message: '{VALUE} is an invalid type',
  }),
  description: z.string().nonempty('description is required'), // Description should not be empty
  quantity: z.number().int().nonnegative('Quantity must be a positive number'), // Ensures quantity is a non-negative integer
  inStock: z.boolean().default(true),
  createdAt: z.date().optional(), // Optional string
  updatedAt: z.date().optional(), // Optional string
});

export default ProductValidationSchema;
