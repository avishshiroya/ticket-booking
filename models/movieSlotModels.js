import mongoose from "mongoose"
import { Schema } from "mongoose"

const movieSlotSchema = new Schema({
    theaterId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Theater",
        required:true
    },
    screenId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"theaterScreen",
        required:true
    },
    movieId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Movie"
    },
    showTime:{
        type:String,
        required:true
    },
    showDate:{
        type:Date,
        required:true
    },
    description:{
        type:String,
    }

},{timestamps:true})
const movieSlotModel = mongoose.model("MovieSlot",movieSlotSchema)
export default movieSlotModel
