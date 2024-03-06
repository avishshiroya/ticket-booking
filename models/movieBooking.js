import mongoose from "mongoose";
import { Schema } from "mongoose";

const movieBookingSchema = new Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Users',
        required:true,
    },
    promoCode:{
        type:String,
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
    discountAmount:{
        type:Number
    }
    ,
    isPaid:{
        type:String,
        required:true,
        enum:["pending","success","cancel"],
        default:"pending"
    },
    paymentId:{
        type:String,
        
    }
    
},{timestamps:true})

const movieBookingModel = mongoose.model("moviebooking",movieBookingSchema)
export default movieBookingModel