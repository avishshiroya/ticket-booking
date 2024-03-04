import mongoose from "mongoose";
import { Schema } from "mongoose";

const movieSeatSchema = new Schema({
    seat:{
        type:String,
        required:true
    },
    movieSlotId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'MovieSlot',
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    isBooked:{
        type:Boolean,
        default:false
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Users'
    }
},{timestamps:true})

const movieSeatModel = mongoose.model("MovieSeat",movieSeatSchema)
export default movieSeatModel