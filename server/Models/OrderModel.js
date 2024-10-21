import mongoose from "mongoose";
const orderProductSchema = new mongoose.Schema({
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    size: String,
    quantity: Number,
    price: Number
  });
  
  const orderSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    products: [orderProductSchema],
    totalPrice: Number,
    paymentId: String,
    orderId: String,
    signature: String,
    orderDate: { type: Date, default: Date.now },
    status: { type: String, default: 'pending' }
  });
  

  const Order = mongoose.model("Order", orderSchema);
  export default Order