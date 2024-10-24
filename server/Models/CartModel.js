import mongoose from "mongoose";


const cartProductSchema = new mongoose.Schema({
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    size: String,
    quantity: Number,
    price: Number
  });
  
  const cartSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    products: [cartProductSchema],
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
  });

  const Cart = mongoose.model("Cart", cartSchema);
  export default Cart