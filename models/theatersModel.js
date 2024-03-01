import mongoose from "mongoose";
import { Schema } from "mongoose";

const theaterSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    location:{
        type:String,
        required:true
    },
    capacity:{
        type:Number,
        required:true
    },
    totalScreens:{
        type:Number,
        required:true
    }
})

const theaterModel = mongoose.model("Theater",theaterSchema)
export default theaterModel