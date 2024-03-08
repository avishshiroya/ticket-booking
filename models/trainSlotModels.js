import mongoose from "mongoose";
import { Schema } from "mongoose";

const trainSlotSchema = new Schema({
    trainId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Train',
        required:true
    },
    routeId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Route',
        required:true
    },
    viaStations: [{ type: String, required: true }],
    arrivalTime:{
        type:String,
        required:true
    },
    despatureTime:{
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

const trainSlotModel = mongoose.model("trainSlot",trainSlotSchema)
export default trainSlotModel