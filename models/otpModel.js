import mongoose from "mongoose";
import { Schema } from "mongoose";

const otpSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
        required: true
    },
    otp: {
        type: Number,
        required: true
    },
    expireAfter: {
        type: Date,
        default: new Date(Date.now() + 5 * 60 * 1000),
    }

},
    { timestamps: true }, { expireAfterSeconds: 5 * 60 * 1000 })

const otpModel = mongoose.model("Otps", otpSchema)
export default otpModel