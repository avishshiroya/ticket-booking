import mongoose from "mongoose";
import { Schema } from "mongoose";


const theaterScreenSchema = new Schema({
    theaterId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Theater",
        required:true
    },
    screenType:{
        type:String,
        required:true
    }
},{timestamps:true})

const theaterScreenModel = mongoose.model("theaterScreen",theaterScreenSchema)
export default theaterScreenModel