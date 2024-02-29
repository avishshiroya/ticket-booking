import otpModel from "../models/otpModel.js"

 export const addOTP = async(_id,otp)=> {return await otpModel.create({user:_id,otp})}