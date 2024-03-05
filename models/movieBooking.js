import mongoose from "mongoose";
import { Schema } from "mongoose";

const movieBookingSchema = new Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Users',
        required:true,
    },
    movieSeatsId:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'MovieSeat',
        required:true
    }],
    totalAmount:{
        type:Number,
        required:true
    },
    isPaid:{
        type:Boolean,
        required:true,
        default:false
    },
    paymentId:{
        type:String,
        
    }
    
},{timestamps:true})

const movieBookingModel = mongoose.model("moviebooking",movieBookingSchema)
export default movieBookingModel