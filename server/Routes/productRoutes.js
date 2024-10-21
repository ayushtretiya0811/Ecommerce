import express from "express";
import { addproductcontroller, addtoCartcontroller, CartAllItemController, decreaseCartQuantity, deleteProduct, getallproductcontroller, increaseCartQuantity, removeCartItem, singleProductcontroller, updateProductController } from "../controller/productcontroller.js";
import { registercontroller } from "../controller/authcontroller.js";
import { requiredSignIn } from "../Middleware/authMiddleware.js";
import multer from "multer";

const router = express.Router();
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads');
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now();
      const fileExtension = file.mimetype.split('/')[1];
      cb(null, `${file.fieldname}-${uniqueSuffix}.${fileExtension}`);
    }
  });
  
  const upload = multer({ storage: storage })
router.get('/allproduct' , getallproductcontroller)
router.delete('/deleteproduct/:id' , deleteProduct)
router.put('/updateproduct/:id', upload.array('images', 10), requiredSignIn, updateProductController);
router.get('/singleProduct/:id',requiredSignIn , singleProductcontroller )
router.post('/add-to-cart', requiredSignIn, addtoCartcontroller )
router.post('/increase-quantity', requiredSignIn, increaseCartQuantity )
router.post('/decrease-quantity', requiredSignIn, decreaseCartQuantity )
router.post('/remove-cart-item', requiredSignIn, removeCartItem )
router.get('/cart-items', requiredSignIn, CartAllItemController )

export default router