import getUserDetails from "../helpers/getUser.js";
import { Docs } from "../models/docModel.js";


export async function getDocs(req,res){

    try{
        const{userName,id}=getUserDetails(req);
    const docs=await Docs.find({});
    res.status(200).json({message:"Documents fetch Succesful",data:docs})
    }
    catch(err){
        res.status(500).json({message:err.message})
    }
}

export async function getDocData(req,res){
    try{
        const{docId}=req.params;
        const doc=await Docs.findById(docId)
         res.status(200).json({message:"Documents fetch Succesful",data:doc})

    }
    catch(error){
        console.log("Error in getDocData",error)
        return res.status(500).json({message:"Internal Server Error"})
 
    }
}