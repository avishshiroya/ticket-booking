import mongoose from "mongoose";
import { Schema } from "mongoose";

const trainSeatSchema = new Schema({
    slotId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'trainSlot',
        required:true
    },
    class:{
        type:String,
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
},{timestamps:true})

const trainSeatModel = mongoose.model("trainSeat",trainSeatSchema)
export default trainSeatModel