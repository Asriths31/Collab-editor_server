import mongoose, { Schema } from "mongoose";


const docSchema=new Schema({

    userId:{
        type:String,
        required:true
    },
    docName:{
        type:String,
        required:true
    },
    userName:{
        type:String,
        required:true
    },
    guests:{
        type:[String],
        default:null
    },
    value:{
        type:String,
        default:null
    }



})

export const Docs=mongoose.model("Document",docSchema)