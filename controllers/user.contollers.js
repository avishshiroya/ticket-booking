import seatbookingModel from "../models/busSeatBookingModels.js";
import otpModel from "../models/otpModel.js";
import userModel from "../models/userModel.js";
import { addOTP } from "../services/userServices.js";
import logger from "../utils/logger.js";
import { otpGenerate } from "../utils/otpGenerator.js";
import { sendMailOtp } from "../utils/sendMail.js";
import { sendMSG } from "../utils/twilioMsg.js";
import {
  detailUpdateUserValidation,
  registerUserValidation,
  userToSendOTP,
} from "../validation/user.validation.js";
import JWT from "jsonwebtoken";

export const registerUserController = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      callingCode,
      mobile,
      DOB,
      address,
      pincode,
      city,
      state,
      country,
    } = req.body;

    const checkUserDetail = registerUserValidation.validate(req.body, {
      abortEarly: false,
    });
    if (checkUserDetail.error) {
      logger.error(checkUserDetail.error.message);
      return res.status(400).json({
        status: "error",
        message: checkUserDetail.error.message,
      });
    }
    const checkUserEmailAndMobile = await userModel.findOne({
      $or: [{ email, mobile }],
    });
    if (checkUserEmailAndMobile) {
      logger.error("Email and Mobile Number used Once");
      return res.status(422).json({
        status: "error",
        message: "Email and Mobile Number used Once",
      });
    }
    const user = new userModel({
      firstName,
      lastName,
      email,
      callingCode,
      mobile,
      DOB,
      address,
      pincode,
      city,
      state,
      country,
    });
    await user.save();

    res.status(200).json({
      status: "success",
      message: "User Register SuccessFully",
    });
    logger.info("User Register SuccessFully");
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: "error",
      message: "Error In User Registration API",
    });
  }
};

//send mail to login
export const sendMailTOLoginController = async (req, res) => {
  try {
    const { user } = req.body;
    console.log(user);
    if (!user) {
        logger.error("Please Provide Mobile Number OR Email")
        return res
        .status(400)
        .json({
          status: "error",
          message: "Please Provide Mobile Number OR Email",
        });
    }
    var mobile, email;
    if (user) {
      if (user.length == 10) {
        mobile = user;
      } else {
        email = user;
      }
    }
    const checkData = userToSendOTP.validate(
      { email, mobile },
      {
        abortEarly: false,
      }
    );
    if (checkData.error) {
        logger.error(checkData.error.message)
      return res.status(422).json({
        status: "error",
        message: checkData.error.message,
      });
    }
    const checkUser = await userModel.findOne({ $or: [{ email }, { mobile }] });
    console.log(checkUser);
    if (!checkUser) {
        logger.error("User Not Found")
      return res.status(400).json({
        status: "error",
        message: "User Not Found",
      });
    }
    const otpGenerator = otpGenerate();
    // console.log(otpGenerator)
    if (email) {
      const sendMail = await sendMailOtp(
        checkUser.email,
        otpGenerator,
        req,
        res
      );
      const sendOtp = await addOTP(checkUser._id, otpGenerator);
      logger.info("OTP SEND TO " + email)
      return res.status(200).json({
        status: "success",
        message: "OTP SEND TO " + email,
        otp: otpGenerator,
      });
    }
    if (mobile) {
      console.log(checkUser.mobile, otpGenerator);
      const sendMsg = await sendMSG(
        checkUser.countryCode,
        checkUser.mobile,
        otpGenerator
      );
      const sendOtp = await addOTP(checkUser._id, otpGenerator);
      logger.info("OTP SEND TO " + mobile)
      return res.status(200).json({
        status: "success",
        message: "OTP SEND TO" + mobile,
        otp: otpGenerator,
      });
    }
  } catch (error) {
    console.log(error);
    logger.error("Error Of Send Login Otp")
    return res.status(500).json({
      status: "error",
      message: "Mobile Number Invalid",
    });
  }
};

export const userLoginController = async (req, res) => {
  try {
    const { otp, user } = req.body;
    if (!user) {
        logger.error("Please Provide Mobile Number OR Email")
      return res
        .status(400)
        .json({
          status: "error",
          message: "Please Provide Mobile Number OR Email",
        });
    }
    var mobile, email;
    if (user) {
      if (user.length == 10) {
        mobile = user;
      } else {
        email = user;
      }
    }
    const checkData = userToSendOTP.validate(
      { email, mobile },
      {
        abortEarly: false,
      }
    );
    if(checkData.error){
        logger.error(checkData.error.message)
        return res.status(422).json({
            status: "error",
            message: checkData.error.message,
          });
    }
    // const { user } = req.cookies
    console.log(user);
    const checkUser = await userModel.findOne({ $or: [{ email }, { mobile }] });
    if (!checkUser) {
        logger.error("User Invalid in login")
      return res.status(400).json({
        status: "error",
        message: "User Invalid",
      });
    }
    const checkExpires = new Date(Date.now());
    console.log(checkExpires);
    const checkOtpDetails = await otpModel.findOne({
      user: checkUser,
      otp,
      status: "pending",
    });

    console.log(checkOtpDetails);
    if (!checkOtpDetails) {
        logger.error("OTP INVALID")
      return res.status(422).json({
        status: "error",
        message: "OTP Invalid",
      });
    }
    if (checkExpires > checkOtpDetails.expireAfter) {
      {
        if (checkOtpDetails.expireAfter) checkOtpDetails.status = "expired";
        await checkOtpDetails.save();
        logger.warn("OTP Expired")
        return res.status(422).json({
          status: "error",
          message: "OTP Expired",
        });
      }
    }
    if (checkOtpDetails.status == "pending") checkOtpDetails.status = "approve";
    checkOtpDetails.save();
    // console.log(updateOTPStatus)
    const token = checkUser.generateToken();
    const refreshToken = checkUser.generateRefreshToken();
    res
      .status(200)
      .cookie("auth", "Bearer " + refreshToken, {
        expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        secure: process.env.NODE_ENV == "development" ? true : false,
        HttpOnly: process.env.NODE_ENV == "development" ? true : false,
        sameSite: process.env.NODE_ENV == "development" ? true : false,
      })
      .json({
        status: true,
        message: "Login SuccessFully",
        token: "Bearer " + token,
        refreshToken: "Bearer " + refreshToken,
      });
      logger.info("Login Successfully")
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: "error",
      message: "Error In User Login API",
    });
  }
};

export const getDetailUserController = async (req, res) => {
  try {
    const user = req.user;
    console.log(user);
    if (!user) {
        logger.error("Please Login Again Get User Detail")
      return res.status(400).json({
        status: "error",
        message: "Please Login again",
      });
    }

    res.status(200).json({
      status: "success",
      message: "User Details",
      data: user,
    });
    logger.info("Get User Deatil Successfully")
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: "error",
      message: "Error In get user Datail API",
      error,
    });
  }
};

export const userDetailUpdateController = async (req, res) => {
  try {
    const { firstName, lastName, DOB, address, pincode, city, state, country } =
      req.body;
    const checkDetails = detailUpdateUserValidation.validate(req.body, {
      abortEarly: false,
    });
    if (checkDetails.error) {
        logger.error(checkDetails.error.message + "Update User")
      return res.status(400).json({
        status: "error",
        message: checkDetails.error.message,
      });
    }
    const checkUser = await userModel.findById(req.user._id);
    if (!checkUser) {
        logger.error("User Not Found Update User")
      return res.status(422).json({
        status: "error",
        message: "User Not Found",
      });
    }
    if (firstName) checkUser.firstName = firstName;
    if (lastName) checkUser.lastName = lastName;
    if (DOB) checkUser.DOB = DOB;
    if (address) checkUser.address = address;
    if (pincode) checkUser.pincode = pincode;
    if (city) checkUser.city = city;
    if (state) checkUser.state = state;
    if (country) checkUser.country = country;

    const userUpdate = await checkUser.save();
    if (!userUpdate) {
        logger.error("User NOt Update")
      return res.status(400).json({
        status: "error",
        message: "User cannot Updated",
      });
    }
    res.status(200).json({
      status: "success",
      message: "user Updated",
      userUpdate,
    });
    logger.info("User Update successfully")
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: "error",
      message: "Error In User Update API",
      error,
    });
  }
};

export const userLogoutController = async (req, res) => {
  try {
    const user = req.user;
    if (!user) {
        logger.error("User Not Found Logout")
      return res.status(400).json({
        status: "error",
        message: "user NOT found",
      });
    }
    logger.info("User Logout")
    res.status(200).clearCookie("auth").json({
      status: "success",
      message: "User Logout",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: "error",
      message: "Error in user Logout API",
      error,
    });
  }
};

export const deleteUserController = async (req, res) => {
  try {
    const checkUser = await userModel.findById(req.user._id);

    if (!checkUser) {
        logger.error("User Not Found Delete User")
      return res.status(400).json({
        status: "error",
        message: "User Not Found",
      });
    }
    const deleteUser = await checkUser.deleteOne();
    if (!deleteUser) {
        logger.error("User Cannot Delete")
      return res.status(400).json({
        status: "error",
        message: "User Cannot Delete",
      });
    }
    res.status(200).json({
      status: "success",
      message: "user Deleted Successfully",
      deleteUser,
    });
    logger.info("User Deleted")
  } catch (error) {
    console.log(error);
    logger.error("Error Of delete User")
    return res.status(500).json({
      status: "error",
      message: "Internal Error",
      error,
    });
  }
};

export const getAllUsersOrder = async (req, res) => {
  try {
    const orders = await seatbookingModel
      .find({ userId: req.user._id })
      .populate("busSeats")
      .populate("trainSeats")
      .populate("movieSeats");
    if (!orders[0]) {
        logger.error("Order Not Found Get User Order")
      return res.status(404).json({
        success: "error",
        message: "Orders Not Found",
        data: null,
      });
    }
    res.status(200).json({
      status: "success",
      message: "Orders",
      totalOrder: orders.length,
      data: orders,
    });
    logger.info("GET All Orders Of Users")
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: "error",
      message: "Internal Error",
      error,
    });
  }
};

export const refreshToken = async (req, res) => {
  try {
    const { auth } = req.cookies;
    console.log();
    if (!auth) {
        logger.error("Cannot Get RefreshToken")
      return res.status(400).send({
        success: false,
        message: "User Not Authenticated",
      });
    }
    const token = auth.split(" ")[1];
    const tokenVerify = JWT.verify(token, process.env.JWT_PASS);
    if (!tokenVerify) {
        logger.error("RefreshToken Cannot Verify")
      return res.success(400).send({
        success: true,
        message: "Token cannot Verify ",
      });
    }
    const user = await userModel.findById(tokenVerify);
    const accesstoken = await user.generateToken();
    res.status(200).json({
      status: "success",
      message: "accesstoken",
      token: "Bearer " + accesstoken,
    });
    logger.info("Access Token Generated Successfully")
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: "error",
      message: "Login Pls!!",
      data: null,
    });
  }
};
