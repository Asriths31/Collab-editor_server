import { Users } from "../models/userModel.js"


export async function getAllUsers(req,res) {
    try{
        const usersData=await Users.find({});
        return res.status(200).json({message:"Fetch Success",data:usersData})
    }
    catch(error){
        console.log("Error in getAllUsers",error)
        return res.status(500).json({message:"Internal Server Error"})
    }
}