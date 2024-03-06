import mongoose, { mongo } from "mongoose";
import { Schema } from "mongoose";

const promoSchema = new Schema({
    code:{
        type:String,
        required:true,
        unique:true
    },
    percentage:{
        type:Number,
    },
    description:{
        type:String,
        required:true
    },
    createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Admin',
        required:true
    }
},{timestamps:true})

const promoCodeModel = new mongoose.model("promoCode",promoSchema)
export default promoCodeModel