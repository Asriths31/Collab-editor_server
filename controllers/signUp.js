import bcrypt from "bcrypt"
import { Users } from "../models/userModel.js";

export default async function signUp(req,res){
    try {
        const { userName, password, emailId } = req.body
         if(!userName || !password|| !emailId){
        return res.status(400).json({message:"Please provide all details"})
    }
        const user=await Users.findOne({emailId})
        if(user){
            return res.status(400).json({message:"User Already Exists"})
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const response = await Users.create({
            userName,
            password: hashedPassword,
            emailId
        })
        console.log("Response of user creation",response)
        res.status(201).json({ message: "User Created Successfully" })
    }
    catch (err) {
        console.log("Error :", err)
        res.status(500).json({ message: "User Creation Failed" })
    }
}