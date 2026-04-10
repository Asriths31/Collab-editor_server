import getUserDetails from "../helpers/getUser.js";
import { Docs } from "../models/docModel.js";



export async function createDoc(req,res){
    try{
        const{userName,id}=getUserDetails(req);
        const{docName}=req.body
    if(!id||!userName||!docName){
        return res.status(400).json({message:"Missing required fields"})
    }
    const doc=await Docs.create({
        userId:id,
        userName,
        docName
    })
    console.log("userDetails",{userName,id},doc)
    return res.status(200).json({message:"Document Created Successfully"})
    }
    catch(err){
        console.log("errorrr",err)
       return res.status(500).json({message:err.message})
    }
}

export async function addData(req,res){
    try{
        const{docId,value}=req.body;
        if(!docId&&!value){
            return res.status(400).json({message:"Missig required Fields"})
        }

        const result=await Docs.updateOne({_id:docId},
            {$set:{value}})
        // console.log({result})
        return res.status(200).json({message:"Updated successfully"})
    }
    catch(err){
        console.log("errorr in addData",err)
        return res.status(500).json({message:err.message})
    }
}