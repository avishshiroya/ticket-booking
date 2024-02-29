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
    }
})

const categoryModel = mongoose.model("Category",categorySchema)
export default categoryModel