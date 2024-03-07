import mongoose from "mongoose";
import { Schema } from "mongoose";

const busSlotSchema = new Schema({
    busId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Bus'
    },
    routeId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Route'
    },
    arrivalTime:{
        type:String,
        required:true
    },
    despatureTime:{
        type:String,
        required:true
    },
    viaStops:{
        type:String,
        required:true
    },
    arrivalDate:{
        type:Date,
        required:true
    },
    despatureDate:{
        type:Date,
        required:true
    },
    totalDistance:{
        type:Number,
        required:true
    },
    travellingHours:{
        type:Number,
        required:true
    },
    createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Admin'
    },
    updatedBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Admin'
    }
},{timestamps:true})

const busSlotModel = mongoose.model("busSlot",busSlotSchema);
export default busSlotModel