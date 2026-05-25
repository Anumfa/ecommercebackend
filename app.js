import express from 'express';
import cors from 'cors';
import morgan from 'morgan';

import bannerRouter from './Routes/bannerRouter.js';
import categoryRouter from './Routes/categoryRouter.js';
import productRouter from './Routes/productRouter.js';

const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use(morgan('dev'));

// Routes
app.use('/api/banner', bannerRouter);
app.use('/api/category', categoryRouter);
app.use('/api/product', productRouter);

// Default Route
app.get('/', (req, res) => {
    res.send('API is running...');
});

export default app;
