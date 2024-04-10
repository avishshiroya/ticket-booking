import mongoose from "mongoose";
import { Schema } from "mongoose";
const MailSchema = new Schema({
    email:{
        type:String,
        required:true
    }
},{timestamps:true})


const MailModel = mongoose.model("Mail",MailSchema)
export default MailModel


