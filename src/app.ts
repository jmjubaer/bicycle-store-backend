/* eslint-disable @typescript-eslint/no-explicit-any */
import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { productRoutes } from './app/modules/products/products.routes';
import { orderRoutes } from './app/modules/orders/orders.routes';
import { userRoutes } from './app/modules/user/user.routes';
import { authRoutes } from './app/modules/auth/auth.route';
import { globalErrorHandler } from './app/errors/GlobalErrorHandler';
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({ credentials: true }));
app.use('/', productRoutes);
app.use('/', orderRoutes);
app.use('/', userRoutes);
app.use('/', authRoutes);
app.get('/', (req, res) => {
  res.send('By-cycle store server is running');
});

// not  found error handler

app.use(globalErrorHandler);
app.all('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'Page not found',
  });
});

export default app;
