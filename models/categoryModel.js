import mongoose from "mongoose";
import { Schema } from "mongoose";

const categorySchema = new Schema({
    name:{
        type:String,
        required:true,
        unique:true
    },
    type:{
        type:String,
        required:true,
        enum:["traveling","entertainment"]
    },
    createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Admin"
    },
    updatedBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Admin"
    }
},{timestamps:true})

const categoryModel = mongoose.model("Category",categorySchema)
export default categoryModel