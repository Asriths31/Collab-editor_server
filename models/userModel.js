import mongoose ,{Schema}from "mongoose";

const usersSchema=new Schema(
    {
        userName:{
            type:String,
            required:true
        },
        password:{
            type:String,
            required:true
        },
        emailId:{
            type:String,
            required:true
        },
        docId:{
            type:String,
            default:null
        }
    },
    {
        timestamps:true
    }
)

export const Users=mongoose.model("users",usersSchema)