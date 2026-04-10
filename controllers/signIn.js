import bcrypt from "bcrypt"
import { Users } from "../models/userModel.js";
import jwt from "jsonwebtoken";

export default async function signIn(req,res){
    const {userName,password}=req.body
        if(!userName || !password){
            return res.status(400).json({message:"Please provide all details"})
        } 
        const user=await Users.findOne({userName})
        console.log("User :",user)
        if(!user){
            return res.status(404).json({message:"User Not Found"})
        }
        const isPasswordValid=bcrypt.compareSync(password,user.password)
        if(!isPasswordValid){
            return res.status(401).json({message:"Invalid Password"})
        }
        const token=jwt.sign({userName:user.userName,id:user._id},process.env.jwt_secret_key,{expiresIn:"6h"})
        console.log("Token :",token)
        res.status(201).cookie("token",token,{httpOnly:true,sameSite:"lax"}).json({message:"Login Successfull",token:token})
}