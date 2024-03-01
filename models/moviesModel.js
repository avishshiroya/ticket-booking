import mongoose from "mongoose";
import { Schema } from "mongoose";

const moviesSchema = new Schema({
    title: {
        type: String,
        required: true,

    },
    genre:{
        type:String,
        required:true,
    },
    releaseYear:{
        type:String,
        required:true
    },
    IMDB_rating:{
        type:Number,
        required:true
    },
    duration:{
        type:String,
        required:true
    },
    casts:[{
        type:String,
        required:true
    }],
    createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Admin"
    },
    updatedBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Admin"
    }
},{timestamps:true})

const movieModel = mongoose.model("Movie",moviesSchema)
export default movieModel