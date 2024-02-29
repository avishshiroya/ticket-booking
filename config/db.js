import mongoose from "mongoose";

const connectDB = async(req,res)=>{
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("DB CONNECT SUCCESSFULLY")
    } catch (error) {
        console.log(`error in DB = ${error}`)
    }
}

export default connectDB