import { z } from 'zod';

export const createCategoryValidationSchema = z.object({
  body: z.object({
    name: z.string({ required_error: 'Name is required' }),
    key: z.string({ required_error: 'Key is required' }),
    image: z.string({ required_error: 'Image is required' }),
  }),
});
