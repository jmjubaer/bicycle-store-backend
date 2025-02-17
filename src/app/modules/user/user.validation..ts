import { z } from 'zod';

export const createUserValidationSchema = z.object({
  body: z.object({
    name: z.string({ required_error: 'Name is required' }),
    email: z
      .string({ required_error: 'Email is required' })
      .email('Invalid email format'),
    password: z.string({ required_error: 'Password is required' }),
    // role: z.enum(['admin', 'customer'], {
    //   message: '{VALUE} is an invalid type',
    // }),
    // status: z.enum(['in-progress', 'blocked'], {
    //   message: '{VALUE} is an invalid type',
    // }),
  }),
});
