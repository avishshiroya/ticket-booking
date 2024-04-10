import adminModel from "../models/adminModels.js";
import { registerAdminValidation } from "../validation/admin.validation.js";
import logger from "../utils/logger.js";
import passwordHash from "../services/passwordHash.js";
import loggerPrint from "../utils/printLogger.js";
import NodeCache from "node-cache";
import userModel from "../models/userModel.js";
const cache = new NodeCache();
import Queue from "bull";
import { tryCatch } from "bullmq";
import MailModel from "../models/mailsModel.js";

const notificationQueue = new Queue("email-queue", {
  redis: {
    port: 6379,
    host: "127.0.0.1",
  },
});
export const registerAdminController = async (req, res) => {
  try {
    const { email, password } = req.body;
    const checkAdminDetails = registerAdminValidation.validate(req.body, {
      abortEarly: false,
    });
    if (checkAdminDetails.error) {
      logger.error(checkAdminDetails.error.message);
      return res.status(400).send({
        status: "error",
        message: checkAdminDetails.error.message,
      });
    }
    const hashPassword = await passwordHash(password);
    const admin = new adminModel({
      email,
      password: hashPassword,
    });
    await admin.save();
    res.status(200).send({
      status: "success",
      message: "Admin register successfully",
    });
    logger.info("Admin Register Successfully");
  } catch (error) {
    console.log(error);
    logger.error("Error in Admin register API");
    return res.status(500).send({
      status: "error",
      message: "Internal Error",
    });
  }
};

export const loginAdminController = async (req, res) => {
  try {
    const { email, password } = req.body;
    const checkAdminDetails = registerAdminValidation.validate(req.body, {
      abortEarly: false,
    });
    if (checkAdminDetails.error) {
      logger.error(checkAdminDetails.error.message);
      return res.status(400).send({
        status: "success",
        message: checkAdminDetails.error.message,
      });
    }
    const checkAdminEmail = await adminModel.findOne({ email });
    if (!checkAdminEmail) {
      logger.error("Admin Not Found! Check Email");
      return res.status(400).send({
        status: "error",
        message: "Admin Not Found! Check Email",
      });
    }
    const comparePassword = await checkAdminEmail.comparePassword(password);
    if (!comparePassword) {
      logger.error("Compare Password In Admin");
      return res.status(400).send({
        status: "error",
        message: "Check Your Password",
      });
    }
    console.log(comparePassword);
    const token = checkAdminEmail.generateToken();
    res
      .status(200)
      .cookie("aAuth", "bearer " + token, {
        expiresIn: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        secure: process.env.NODE_ENV == "development" ? true : false,
        HttpOnly: process.env.NODE_ENV == "development" ? true : false,
        sameSite: process.env.NODE_ENV == "development" ? true : false,
      })
      .send({
        status: "success",
        message: "Admin Login",
        token,
      });
    // console.log(req);
    // logger.info(`${checkAdminEmail._id} Admin Login Successfully`)
    // console.log(req.headers['user-agent']);
    logger.info(
      `${req.method} ${req.originalUrl} ${req.headers["user-agent"]} ${res.statusCode}  Admin Login Successfully`
    );
  } catch (error) {
    console.log(error);
    logger.error("Error In Admin Login");
    return res.status(500).send({
      status: "error",
      message: "Interanl Error",
    });
  }
};

export const getAdminDetails = async (req, res) => {
  try {
    if (cache.get("adminDetail")) {
      console.log(cache.get("adminDetail"));
      logger.info(
        `${req.method} ${req.originalUrl} 200 Get Admin Detail Successfully`
      );
      return res.status(200).send({
        status: "success",
        message: "Admin Details",
        data: cache.get("adminDetail"),
      });
      // console.log()
    }
    console.log("123");
    const admin = req.admin;
    if (!admin) {
      logger.error("Admin Not authorized Get Admin");
      return res.status(401).send({
        status: "error",
        message: "Admin Unauthorized",
      });
    }
    const checkAdmin = await adminModel.findById(admin._id);
    if (!checkAdmin) {
      logger.error("Admin Not Found get Admin");
      return res.status(400).send({
        status: "error",
        message: "Admin Not Found",
      });
    }
    cache.set("adminDetail", checkAdmin);
    logger.info(
      `${req.method} ${req.originalUrl} ${res.statusCode} Get Admin Detail Successfully`
    );
    return res.status(200).send({
      status: "success",
      message: "Admin Details",
      data: checkAdmin,
    });
  } catch (error) {
    console.log(error);
    logger.error("Error In Get Admin Detail");
    return res.status(500).send({
      status: "error",
      message: "Internal Error",
    });
  }
};

export const adminLogoutController = async (req, res) => {
  try {
    const user = req.admin;
    if (!user) {
      logger.error("Admin Not Authorized logout");
      return res.status(401).json({
        status: "error",
        message: "Admin unauthorized",
      });
    }
    cache.del("adminDetail");
    res.status(200).clearCookie("aAuth").json({
      status: "success",
      message: "Admin Logout",
    });
    logger.info("Admin Logout");
  } catch (error) {
    console.log(error);
    logger.error("Error in user logout API");
    return res.status(500).json({
      status: "error",
      message: "Internal error",
      error,
    });
  }
};

export const AddMails = async (req, res) => {
  try {
    const { start, end } = req.body;
    for (let i = start; i <= end; i++) {
      const mailAdd = new MailModel({
        email: "avish" + i + "@yopmail.com",
      });
      await mailAdd.save();
    }
    return res.json("100 Mail Saved");
  } catch (error) {
    console.log(error);
  }
};

export const SendMAilToAllUsers = async (req, res) => {
  try {
    // ---------- send the single mail to all ----------
    // const users = await MailModel.find({},{email:1});
    // // console.log("1");
    // // console.log(users);
    // users.forEach((user,index)=>{
    //   notificationQueue.add({user:user.email}).then(()=>{
    //     // console.log(index +1);
    //     if(index+1 === users.length){
    //       res.json({
    //         status:'success',
    //         message:"Notification Sent To all Users"
    //       })
    //     }
    //   })
    // })

    //--------send email to all the user at a one time using multiple email ------------
    const users = await MailModel.find({}, { email: 1 ,_id:0});
    let emails = [];
    console.log(users);
    users.forEach((user, index) => {
      emails.push(user.email);
    });
    await notificationQueue.add(emails).then(() => {
      // console.log(index +1);
      // if(index+1 === users.length){
      res.json({
        status: "success",
        message: "Notification Sent To all Users",
      });
      // }
    });
  } catch (error) {
    console.log(error);
  }
};
