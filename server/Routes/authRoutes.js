import express from "express";
import { getUserController, logincontroller, registercontroller } from "../controller/authcontroller.js";
import { requiredSignIn } from "../Middleware/authMiddleware.js";

const router = express.Router();

router.post("/register" ,registercontroller)
router.post("/login" , logincontroller)
router.get("/userDetail/:userId" , requiredSignIn, getUserController)




export default router;