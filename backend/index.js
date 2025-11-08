import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import productRoutes from './routes/product.routes.js';
import cartRoutes from './routes/cart.routes.js';
import checkoutRoutes from './routes/receipt.routes.js';
import { connectDB } from './config/connectDB.js';
const app=express();
app.use(express.json());

app.use(cookieParser());
const allowedOrigins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173"
];

app.use(cors({ origin: allowedOrigins, credentials: true }));
connectDB();
app.use("/api/products",productRoutes);
app.use("/api/cart",cartRoutes);
app.use("/api/checkout",checkoutRoutes);
const PORT=process.env.PORT || 4000;
app.listen(PORT,()=>{
    console.log(`server is running on port ${PORT}`);
});

