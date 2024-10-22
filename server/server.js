import dotenv from 'dotenv'
// require('dotenv').config();
dotenv.config()
console.log('RAZORPAY_KEY_ID:', process.env.RAZORPAY_KEY_ID);
console.log('RAZORPAY_KEY_SECRET:', process.env.RAZORPAY_KEY_SECRET);
import express from 'express'
import cors from 'cors'
import connectDB from './config/db.js'
import authRouter from './Routes/authRoutes.js'
import adminRouter from './Routes/adminRoutes.js'
import productRoutes from './Routes/productRoutes.js'
import orderRoutes from './Routes/orderRoutes.js'
const app = express()

app.use(express.json())
// app.use(cors())
app.use(express.urlencoded({ extended: true }));

connectDB();
app.listen(1000, () => console.log('server is running on port 5000'))
console.log(process.env.PORT)
app.use(express.static('uploads'));
app.use(cors({
    origin: '*', // Adjust this to your frontend URL for better security
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/api/user', authRouter)
app.use('/api/admin', adminRouter);
app.use('/api/product', productRoutes);
app.use('/api/order', orderRoutes);