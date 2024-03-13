import seatbookingModel from "../models/busSeatBookingModels.js"
import otpModel from "../models/otpModel.js"
import userModel from "../models/userModel.js"
import { addOTP } from "../services/userServices.js"
import { otpGenerate } from "../utils/otpGenerator.js"
import { sendMailOtp } from "../utils/sendMail.js"
import { sendMSG } from "../utils/twilioMsg.js"
import { detailUpdateUserValidation, registerUserValidation, userToSendOTP } from "../validation/user.validation.js"
import JWT from "jsonwebtoken"

export const registerUserController = async (req, res) => {
    try {
        const { name, email, mobile, DOB, address, pincode, city, state, country } = req.body

        const checkUserDetail = registerUserValidation.validate(req.body, {
            abortEarly: false
        })
        if (checkUserDetail.error) {
            return res.status(401).json({
                "status": "error",
                message: checkUserDetail.error.message
            })
        }
        const checkUserEmailAndMobile = await userModel.findOne({ $or: [{ email, mobile }] });
        if (checkUserEmailAndMobile) {
            return res.status(401).json({
                "status": "error",
                message: "Email and Mobile Number Must Be Unique"
            })
        }
        const user = new userModel({
            name, email, mobile, DOB, address, pincode, city, state, country
        })
        await user.save();
        res.status(200).json({
            "status": "success",
            message: "User Register SuccessFully"
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            "status": "error",
            message: "Error In User Registration API"
        })
    }
}

//send mail to login
export const sendMailTOLoginController = async (req, res) => {
    try {
        const { user } = req.body
        console.log(user);
        if (!user) { return res.status(401).json({ "status": "error", message: "Please Provide Mobile Number OR Email" }) }
        var mobile, email;
        if (user) {
            if (user.length == 10) {
                mobile = user;
            } else {
                email = user;
            }
        }
        const checkData = userToSendOTP.validate({ email, mobile }, {
            abortEarly: false
        })
        if (checkData.error) {
            return res.status(401).json({
                "status": "error",
                message: checkData.error.message
            })
        }
        const checkUser = await userModel.findOne({ $or: [{ email }, { mobile }] });
        console.log(checkUser)
        if (!checkUser) {
            return res.status(401).json({
                "status": "error",
                message: "User Not Found"
            })
        }
        const otpGenerator = otpGenerate();
        // console.log(otpGenerator)
        if (email) {
            const sendMail = await sendMailOtp(checkUser.email, otpGenerator, req, res)
            const sendOtp = await addOTP(checkUser._id, otpGenerator)
            return res.status(200).json({
                "status": "success",
                message: "OTP SEND TO " + email,
                otp:otpGenerator
            })

        }
        if (mobile) {
            console.log(checkUser.mobile, otpGenerator)
            const sendMsg = await sendMSG(checkUser.mobile, otpGenerator)
            const sendOtp = await addOTP(checkUser._id, otpGenerator)
            return res.status(200).json({
                "status": "success",
                message: "OTP SEND TO" + mobile,
                otp:otpGenerator
            })
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            "status": "error",
            message: "Mobile Number Invalid"
        })
    }
}

export const userLoginController = async (req, res) => {
    try {
        const { otp, user } = req.body
        if (!user) { return res.status(401).json({ "status": "error", message: "Please Provide Mobile Number OR Email" }) }
        var mobile, email;
        if (user) {
            if (user.length == 10) {
                mobile = user;
            } else {
                email = user;
            }
        }
        const checkData = userToSendOTP.validate({ email, mobile }, {
            abortEarly: false
        })
        // const { user } = req.cookies
        console.log(user)
        const checkUser = await userModel.findOne({ $or: [{ email }, { mobile }] });
        if (!checkUser) {
            return res.status(401).json({
                "status": "error",
                message: "User Invalid"
            })
        }
        const checkExpires = new Date(Date.now())
        console.log(checkExpires)
        const checkOtpDetails = await otpModel.findOne({ user: checkUser, otp, status: "pending" });


        console.log(checkOtpDetails);
        if (!checkOtpDetails) {
            return res.status(401).json({
                "status": "error",
                message: "OTP Invalid"
            })
        }
        if (checkExpires > checkOtpDetails.expireAfter) {
            {
                if (checkOtpDetails.expireAfter) checkOtpDetails.status = "expired"
                await checkOtpDetails.save();
                return res.status(401).json({
                    "status": "error",
                    message: "OTP Invalid"
                })
            }

        }
        if (checkOtpDetails.status == "pending") checkOtpDetails.status = "approve"
        checkOtpDetails.save();
        // console.log(updateOTPStatus)
        const token = checkUser.generateToken();
        const refreshToken = checkUser.generateRefreshToken();
        res.status(200).cookie("auth", "Bearer " + refreshToken, {
            expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
            secure: process.env.NODE_ENV == "development" ? true : false,
            HttpOnly: process.env.NODE_ENV == "development" ? true : false,
            sameSite: process.env.NODE_ENV == "development" ? true : false
        }).json({
            status: true,
            message: "Login SuccessFully",
            token:"Bearer " + token,
            refreshToken:"Bearer " + refreshToken,
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            "status": "error",
            message: "Error In User Login API"
        })
    }
}

export const getDetailUserController = async (req, res) => {
    try {

        const user = req.user
        console.log(user);
        if (!user) {
            return res.status(401).json({
                "status": "error",
                message: "Please Login again"
            })
        }
        res.status(200).json({
            "status": "success",
            message: "User Details",
            data: user
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            "status": "error",
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
            return res.status(401).json({
                "status": "error",
                message: checkDetails.error.message
            })
        }
        const checkUser = await userModel.findById(req.user._id)
        if (!checkUser) {
            return res.status(401).json({
                "status": "error",
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
        if (!userUpdate) {
            return res.status(401).json({
                "status": "error",
                message: "User cannot Updated"
            })
        }
        res.status(200).json({
            "status": "success",
            message: "user Updated",
            userUpdate
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            "status": "error",
            message: "Error In User Update API",
            error
        })
    }
}

export const userLogoutController = async (req, res) => {
    try {
        const user = req.user;
        if (!user) {
            return res.status(401).json({
                "status": "error",
                message: "user NOT found"
            })
        }
        res.status(200).clearCookie("auth").json({
            "status": "success",
            message: "User Logout"
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            "status": "error",
            message: "Error in user Logout API",
            error
        })
    }
}

export const deleteUserController = async (req, res) => {
    try {
        const checkUser = await userModel.findById(req.user._id);
        if (!checkUser) {
            return res.status(401).json({
                "status": "error",
                message: "User Not Found"
            })
        }
        const deleteUser = await checkUser.deleteOne();
        if (!deleteUser) {
            return res.status(401).json({
                "status": "error",
                message: "Delete User Successfully"
            })
        }
        res.status(200).json({
            "status": "success",
            message: "user Deleted Successfully",
            deleteUser
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            "status": "error",
            message: "Error in Delete User API",
            error
        })
    }
}

export const getAllUsersOrder = async (req, res) => {
    try {

        const orders = await seatbookingModel.find({ userId: req.user._id }).populate("busSeats").populate("trainSeats").populate("movieSeats");
        if (!orders[0]) {
            return res.status(404).json({
                success: "error",
                message: "Orders Not Found",
                data: null
            })
        }
        res.status(200).json({
            status: "success",
            message: "Orders",
            totalOrder:orders.length,
            data: orders,
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            "status": "error",
            message: "Internal Error",
            error
        })
    }
}

export const refreshToken = async (req,res)=>{
    try {
        const {auth}= req.cookies;
        console.log();
        if(!auth)
        {
            return res.status(401).send({
                success:false,
                message:"User Not Authenticated"
            })
        }
        const token = auth.split(" ")[1];
        const tokenVerify = JWT.verify(token,process.env.JWT_PASS)
        if(!tokenVerify){
            return res.success(401).send({
                success:true,
                message:"Token cannot Verify "
            })
        }
        const user = await userModel.findById(tokenVerify);
        const accesstoken = await user.generateToken();
        res.status(200).json({
            status:"success",
            message:"accesstoken",
            token:"Bearer " + accesstoken
        })
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            status:"error",
            message:'Login Pls!!',
            data:null
        })
    }
}