/* eslint-disable @typescript-eslint/no-explicit-any */
import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import { productRoutes } from './app/modules/products/products.routes';
import { orderRoutes } from './app/modules/orders/order.routes';
const app = express();

app.use(express.json());
app.use(cors());

app.use('/', productRoutes);
app.use('/', orderRoutes);
app.get('/', (req, res) => {
  res.send('By-cycle store server is running');
});

// not  found error handler
app.all('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'Page not found',
  });
});

// global error handler
app.use((error: any, req: Request, res: Response, next: NextFunction) => {
  if (error) {
    res.status(400).json({
      success: false,
      message: 'Something went wrong',
    });
  }
  next();
});
export default app;
