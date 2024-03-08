import mongoose from "mongoose";
import { Schema } from "mongoose";

export const busSeatBookSchema = new Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Users',
        required:true
    },
    busSeats:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'busSeat'
    }],
    trainSeats:[{
        type:String
    }],
    promoCode:{
        type:String
    },
    totalAmount:{
        type:Number,
        required:true
    },
    discountedAmount:{
        type:Number,
        required:true
    },
    isPaid:{
        type:String,
        enum:["success","rejected","pending"],
        default:"pending",
        required:true
    },
    paymentId:{
        type:String
    }
},{timestamps:true})

const seatbookingModel = mongoose.model("BusTrainSeatBooking",busSeatBookSchema)
export default seatbookingModel