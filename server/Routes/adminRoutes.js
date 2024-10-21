import express from "express";
import { addproductcontroller } from "../controller/productcontroller.js";
// import { logincontroller, registercontroller } from "../controller/authcontroller.js";
import multer from 'multer';
import { AddCategoryController, allCategoriesDisplayController, AllCategoryController, deleteCategoryController } from "../controller/CategoryController.js";
import { requiredSignIn } from "../Middleware/authMiddleware.js";
const router = express.Router();
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() 
      const fileExtension = file.mimetype.split('/')[1];
      cb(null, `${file.fieldname}-${uniqueSuffix}.${fileExtension}`)

    }
  })
const upload = multer({ storage: storage });

router.post('/addproduct',  upload.array('images',10), requiredSignIn,  addproductcontroller)
router.post('/addcategory', requiredSignIn ,  AddCategoryController )
router.get('/allcategory', requiredSignIn ,  AllCategoryController )
router.get('/allcategoryDisplay', requiredSignIn ,  allCategoriesDisplayController )
router.get('/deletecategory/:id', requiredSignIn ,  deleteCategoryController )




export default router;