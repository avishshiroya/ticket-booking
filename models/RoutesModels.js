import mongoose from "mongoose";
import { Schema } from "mongoose";

const routesSchema = new Schema({
    categoryId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Category"
    },
    from:{
        type:String,
        required:true
    },
    to:{
        type:String,
        required:true
    },
    createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Admin"
    },
    updatedBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Admin"
    }
},{timestamps:true})

const routesModel = mongoose.model("Route",routesSchema)
export default routesModel

