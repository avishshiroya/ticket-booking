import mongoose from "mongoose";
import { Schema } from "mongoose";

const trainSchema = new Schema({
    categoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        unique: true
    }
    , name: {
        type: String,
        required: true
    },
    uniqueId: {
        type: String,
        required: true,
        unique: true
    },
    sourceStn: {
        type: String,
        required: true
    },
    destinationStn: {
        type: String,
        required: true
    },
    viaStations: [{ type: String, required: true }],
    totalDistance:{
        type:Number,
        required:true
    },
    classes:[{
        type:String,
        required:true
    }],
    capacity:{
        type:Number,
        required:true
    },
    createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Admin',
    },
    updatedBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Admin',
    }
},{timestamps:true})

const trainModel =  mongoose.model("Train",trainSchema)
export default trainModel
