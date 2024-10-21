 import mongoose from "mongoose";



 const addressSchema = new mongoose.Schema({
    addressLine1: String,
    addressLine2: String,
    city: String,
    state: String,
    postalCode: String,
    // country: String  
  });
  
  const orderHistorySchema = new mongoose.Schema({
    orderId: { type: mongoose.Schema.Types.ObjectId, ref: 'Order' },
    orderDate: Date
  });
  
  const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }, // Should be hashed
    addresses: [addressSchema],
    orderHistory: [orderHistorySchema],
    admin : {type: Boolean, default: false},
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
  });
 const User = mongoose.model("User", userSchema);

 export default User