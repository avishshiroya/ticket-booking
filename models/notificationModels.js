import mongoose from "mongoose";

const notificationSchema = mongoose.Schema({
    message:{
        type:String,
        required:true
    },
    status:{
        type:Number,
        required:true,
        enum:[0,1], //0==>unsend , 1==>sended
        default:0
    }
},{timestamps:true})

const notificationModel = mongoose.model('Notification',notificationSchema)

export default notificationModel