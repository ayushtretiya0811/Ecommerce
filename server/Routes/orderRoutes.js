import express from 'express'
import { requiredSignIn } from '../Middleware/authMiddleware.js'
import { AddAddressController, allOrders, createOrder, generateInvoice, verifyPayment } from '../controller/orderController.js'
const router =  express.Router()


router.post('/addAddress', requiredSignIn, AddAddressController )
router.post('/createOrder', requiredSignIn, createOrder);
router.post('/verifyPayment', requiredSignIn, verifyPayment);
router.get('/allorders', requiredSignIn, allOrders)
router.get('/invoice/:orderId', requiredSignIn, generateInvoice);
export default router