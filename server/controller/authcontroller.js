import User from "../Models/UserModel.js";
import jwt from "jsonwebtoken";
import { comparePassword, hashPassword } from "../Helper/authHelper.js";

export const registercontroller =  async (req, res) => {
    try {
        const { username, email, password } = req.body;
        if (!username ||!email ||!password) {
            return res.status(400).send({
                message: "All fields are required",
                success: false
            })
        }
        const existuser = await User.findOne({ email });

        if (existuser) {
            return res.status(400).send({
                message: "User already exist",
                success: false
            })
        }
        const hashedPassword = await hashPassword(password);
        const user = new User({ username, email, password:hashedPassword });
        await user.save();
        res.status(200).send({
            message: "User registered successfully",
            success: true,
            user
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            message: "Error while registering",
            success: false
           
        })
    }
}


export const logincontroller = async (req, res) => {

    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).send({
                message: "All fields are required",
                success: false
            })
        }
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).send({
                message: "User not found",
                success: false
            })
        }
        const match = await comparePassword(password, user.password);
        if (!match) {
            return res.status(400).send({
                message: "Invalid credentials",
                success: false
            })
        }    const token = jwt.sign({_id: user._id}, process.env.JWT, {expiresIn: '7d'})
        res.setHeader('Authorization', `Bearer ${token}`);
        res.send({
            message: 'login successfully',
            success: true,
            user,
            token
        }).status(200)
    } catch (error) {
        console.log(error)
        res.status(500).send({
            message: "Error while registering",
            success: false
           
        })
    }
    
}


export const getUserController = async (req, res) => {

try {
    const userId = req.params.userId
    if (!userId) {
        return res.status(400).send({
            message: "User id is required",
            success: false
        })
    }
    const user = await User.findOne({ _id: userId });
    if (!user) {    
        return res.status(400).send({
            message: "User not found",
            success: false
        })
    }
    res.status(200).send({
        success: true,
        user
    })
    
} catch (error) {
    console.log(error)
    res.status(500).send({
        message: "Error while registering",
        success: false
       
    })
}
}