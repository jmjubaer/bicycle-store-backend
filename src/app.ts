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
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: ['http://localhost:5173'], credentials: true }));

// routes =====
app.use('/api', productRoutes);
app.use('/api', orderRoutes);
app.use('/api', userRoutes);
app.use('/api', authRoutes);
app.use('/api', reviewRoutes);
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
