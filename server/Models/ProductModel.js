import mongoose from "mongoose";
const sizeSchema = new mongoose.Schema({
    size: String,
    price: Number,
    stock: Number
  });
  
  const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: String,
    images: [String],
    // categories: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Category' }],
    sizes: [sizeSchema],
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
  });
  
const Product = mongoose.model("Product", productSchema);
  export default Product;