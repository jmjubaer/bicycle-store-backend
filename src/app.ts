/* eslint-disable @typescript-eslint/no-explicit-any */
import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { productRoutes } from './app/modules/products/products.routes';
import { orderRoutes } from './app/modules/orders/orders.routes';
import { userRoutes } from './app/modules/user/user.routes';
import { authRoutes } from './app/modules/auth/auth.route';
import { globalErrorHandler } from './app/errors/GlobalErrorHandler';
import { reviewRoutes } from './app/modules/reviews/review.route';
import { categoryRoutes } from './app/modules/category/category.route';
import { flashSaleRoutes } from './app/modules/flashSell/flashSale.routes';
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: ['https://bi-cycles-store-app.vercel.app', 'http://localhost:5173'],
    credentials: true,
  }),
);

// routes =====
app.use('/api', productRoutes);
app.use('/api', orderRoutes);
app.use('/api', userRoutes);
app.use('/api', authRoutes);
app.use('/api', reviewRoutes);
app.use('/api', categoryRoutes);
app.use('/api', flashSaleRoutes);
app.get('/', (req, res) => {
  res.send('By-cycle store server is running');
});

// global error handler =====
app.use(globalErrorHandler);

// not found error handler =====
app.all('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'Page not found',
  });
});

export default app;
