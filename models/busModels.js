import mongoose from "mongoose";
import { Schema } from "mongoose";

const busSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    type:{
        type:String,
        required:true
    },
    license_plate:{
        type:String,
        unique:true,
        required:true
    },
    categoryId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Category',
        required:true
    },
    totalSeats:{
        type:Number,
        required:true
    },
    createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Admin"
    },
    updatedBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Admin"
    },

},{timestamps:true})

const busModel = mongoose.model("Bus",busSchema)
export default busModel