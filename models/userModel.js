import mongoose from "mongoose";
import { Schema } from "mongoose";
import JWT from "jsonwebtoken"
const userSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    mobile:{
        type:String,
        unique:true,
        required:true
    },
    DOB:{
        type:Date,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    pincode:{
        type:String,
        required:true
    },
    city:{
        type:String,
        required:true
    },
    state:{
        type:String,
        required:true
    },
    country:{
        type:String,
        required:true
    }
},{timestamps:true})

userSchema.methods.generateToken = function(){
    return JWT.sign({_id:this._id},process.env.JWT_PASS);
}

const userModel = mongoose.model('Users',userSchema)
export default userModel