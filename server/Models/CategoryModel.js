import mongoose, { Types } from "mongoose";


// const categorySchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   description: String,
//   parentCategoryId: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', default: null }
// });

const categorySchema = new mongoose.Schema({
  name: String,
  description: String,
  parent: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    default: null
  }

}, { timestamps: true });
const Category = mongoose.model('Category', categorySchema);

export default Category