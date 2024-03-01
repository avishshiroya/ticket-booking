import mongoose from "mongoose";
import { Schema } from "mongoose";
import bcrypt from "bcrypt"
import JWT from "jsonwebtoken"
const adminSchema = new Schema({
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
},{timestamps:true})

adminSchema.pre("save", async function (next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 10)
})
adminSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
}
adminSchema.methods.generateToken = function(){
    return JWT.sign({_id:this._id},process.env.JWT_PASS,{
        expiresIn:'7d'
    })
}

const adminModel = mongoose.model("Admin",adminSchema)
export default adminModel


