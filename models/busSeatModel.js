import mongoose from "mongoose";
import { Schema } from "mongoose";

const busSeatSchema = new Schema({
    slotId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'busSlot',
        required:true
    },
    seatOn:{
        type:String,
        enum:['upper','lower'],
        required:true
    },
    seatNo:{
        type:Number,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    name:{
        type:String,

    },
    age:{
        type:Number,

    },
    gender:{
        type:String,
        enum:["male","female","other"],

    },
    inMaintainance:{
        type:Boolean,
        default:false
    },
    isBooked:{
        type:Boolean,
        default:false,
        required:true
    }
},{timeStamps:true})

const busSeatModel = mongoose.model("busSeat",busSeatSchema)
export default busSeatModel