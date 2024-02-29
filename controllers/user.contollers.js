import otpModel from "../models/otpModel.js"
import userModel from "../models/userModel.js"
import { addOTP } from "../services/userServices.js"
import { otpGenerate } from "../utils/otpGenerator.js"
import { sendMailOtp } from "../utils/sendMail.js"
import { sendMSG } from "../utils/twilioMsg.js"
import { detailUpdateUserValidation, registerUserValidation, userToSendOTP } from "../validation/user.validation.js"

export const registerUserController = async (req, res) => {
    try {
        const { name, email, mobile, DOB, address, pincode, city, state, country } = req.body

        const checkUserDetail = registerUserValidation.validate(req.body, {
            abortEarly: false
        })
        if (checkUserDetail.error) {
            return res.status(401).send({
                success: false,
                message: checkUserDetail.error.message
            })
        }
        const checkUserEmailAndMobile = await userModel.findOne({ $or: [{ email, mobile }] });
        if (checkUserEmailAndMobile) {
            return res.status(401).send({
                success: false,
                message: "Email and Mobile Number Must Be Unique"
            })
        }
        const user = new userModel({
            name, email, mobile, DOB, address, pincode, city, state, country
        })
        await user.save();
        res.status(200).send({
            success: true,
            message: "User Register SuccessFully"
        })
    } catch (error) {
        console.log(error);
        return res.status(401).send({
            success: false,
            message: "Error In User Registration API"
        })
    }
}


//send mail to login
export const sendMailTOLoginController = async (req, res) => {
    try {
        const { data } = req.body
        if (!data) { return res.status(401).send({ success: false, message: "Please Provide Mobile Number OR Email" }) }
        var mobile, email;
        if (data) {
            if (data.length == 10) {
                mobile = data;
            } else {
                email = data;
            }
        }
        const checkData = userToSendOTP.validate({ email, mobile }, {
            abortEarly: false
        })
        if (checkData.error) {
            return res.status(401).send({
                success: false,
                message: checkData.error.message
            })
        }
        const checkUser = await userModel.findOne({ $or: [{ email }, { mobile }] });
        console.log(checkUser)
        if (!checkUser) {
            return res.status(401).send({
                success: false,
                message: "User Not Found"
            })
        }
        const otpGenerator = otpGenerate();
        // console.log(otpGenerator)
        if (email) {
            const sendMail = await sendMailOtp(checkUser.email, otpGenerator, req, res)
            const sendOtp = await addOTP(checkUser._id, otpGenerator)
            return res.status(200).cookie("user", checkUser._id, {
                expires:new Date( Date.now() + 3 * 60 * 1000),
                secure: process.env.NODE_ENV == "development" ? true : false,
                HttpOnly: process.env.NODE_ENV == "development" ? true : false,
                sameSite: process.env.NODE_ENV == "development" ? true : false
            }).send({
                success: true,
                message: "send otp", otpGenerator, sendMail, sendOtp
            })

        }
        if (mobile) {
            console.log(checkUser.mobile, otpGenerator)
            const sendMsg = await sendMSG(checkUser.mobile, otpGenerator)
            const sendOtp = await addOTP(checkUser._id, otpGenerator)
            return res.status(200).cookie("user", checkUser._id, {
                expires:new Date( Date.now() + 3 * 60 * 1000),
                secure: process.env.NODE_ENV == "development" ? true : false,
                HttpOnly: process.env.NODE_ENV == "development" ? true : false,
                sameSite: process.env.NODE_ENV == "development" ? true : false
            }).send({
                success: true,
                message: "OTP send", otpGenerator, sendMsg, sendOtp
            })
        }
    } catch (error) {
        console.log(error);
        return res.status(401).send({
            success: false,
            message: "Error In User OTP send API"
        })
    }
}

export const userLoginController = async (req, res) => {
    try {
        const { otp } = req.body
        const { user } = req.cookies
        console.log(user)
        const checkUser = await userModel.findById(user);
        if (!checkUser) {
            return res.status(401).send({
                success: false,
                message: "User Invalid"
            })
        }
        const checkOtpDetails = await otpModel.findOne({ user, otp });
        if (!checkOtpDetails) {
            return res.status(401).send({
                success: true,
                message: "OTP Invalid"
            })
        }
        const token = checkUser.generateToken();
        res.status(200).cookie("auth", "bearer " + token, {
            expires: new Date( Date.now() + 7 * 24 * 60 * 60 * 1000), 
            secure: process.env.NODE_ENV == "development" ? true : false,
            HttpOnly: process.env.NODE_ENV == "development" ? true : false,
            sameSite: process.env.NODE_ENV == "development" ? true : false
        }).send({
            status: true,
            message: "Login SuccessFully",
            token
        })
    } catch (error) {
        return res.status(401).send({
            success: false,
            message: "Error In User Login API"
        })
    }
}

export const getDetailUserController = async (req, res) => {
    try {

        const user = req.user
        console.log(user);
        if (!user) {
            return res.status(401).send({
                success: false,
                message: "Please Login again"
            })
        }
        res.status(200).send({
            success: true,
            message: "User Details",
            data: user
        })
    } catch (error) {
        console.log(error)
        return res.status(401).send({
            success: false,
            message: "Error In get user Datail API",
            error
        })
    }
}


export const userDetailUpdateController = async (req, res) => {
    try {
        const { name, DOB, address, pincode, city, state, country } = req.body
        const checkDetails = detailUpdateUserValidation.validate(req.body, {
            abortEarly: false
        })
        if (checkDetails.error) {
            return res.status(401).send({
                success: false,
                message: checkDetails.error.message
            })
        }
        const checkUser = await userModel.findById(req.user._id)
        if (!checkUser) {
            return res.status(401).send({
                success: false,
                message: "User Not Found"
            })
        }
        if (name) checkUser.name = name;
        if (DOB) checkUser.DOB = DOB;
        if (address) checkUser.address = address;
        if (pincode) checkUser.pincode = pincode;
        if (city) checkUser.city = city;
        if (state) checkUser.state = state;
        if (country) checkUser.country = country;

        const userUpdate = await checkUser.save();
        if(!userUpdate){
            return res.status(401).send({
                success:false,
                message:"User cannot Updated"
            })
        }
        res.status(200).send({
            success:true,
            message:"user Updated",
            userUpdate
        })
    } catch (error) {
        console.log(error)
        return res.status(401).send({
            success:false,
            message:"Error In User Update API",
            error
        })
    }
}

export const userLogoutController = async (req,res)=>{
    try {
        const user = req.user;
        if(!user){
            return res.status(401).send({
                success:false,
                message:"user NOT found"
            })
        }
        res.status(200).clearCookie("auth").send({
            success:true,
            message:"User Logout"
        })
    } catch (error) {
        console.log(error)
        return res.status(401).send({
            success:false,
            message:"Error in user Logout API",
            error
        })
    }
}