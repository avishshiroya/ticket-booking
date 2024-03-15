import adminModel from "../models/adminModels.js"
import { registerAdminValidation } from "../validation/admin.validation.js"
import logger from "../utils/logger.js"
export const registerAdminController = async (req, res) => {
    try {
        const { email, password } = req.body
        const checkAdminDetails = registerAdminValidation.validate(req.body, {
            abortEarly: false
        })
        if (checkAdminDetails.error) {
            logger.error(checkAdminDetails.error.message)
            return res.status(400).send({
                "status": "error",
                message: checkAdminDetails.error.message
            })
        }
        const admin = new adminModel({
            email, password
        })
        await admin.save();
        res.status(200).send({
            "status": "success",
            message: "Admin register successfully"
        })
        logger.info("Admin Register Successfully")
    } catch (error) {
        console.log(error)
        logger.error("Error in Admin register API")
        return res.status(500).send({
            "status": "error",
            message: "Internal Error"
        })
    }
}

export const loginAdminController = async (req, res) => {
    try {
        const { email, password } = req.body
        const checkAdminDetails = registerAdminValidation.validate(req.body, {
            abortEarly: false
        })
        if (checkAdminDetails.error) {
            logger.error(checkAdminDetails.error.message)
            return res.status(400).send({
                "status": "success",
                message: checkAdminDetails.error.message
            })
        }
        const checkAdminEmail = await adminModel.findOne({ email });
        if (!checkAdminEmail) {
            logger.error("Admin Not Found! Check Email")
            return res.status(400).send({
                "status": "error",
                message: "Admin Not Found! Check Email"
            })
        }
        const comparePassword = checkAdminEmail.comparePassword(password);
        if (!comparePassword) {
            logger.error("Compare Password In Admin")
            return res.status(400).send({
                "status": "error",
                message: "Check Your Password"
            })
        }
        const token = checkAdminEmail.generateToken();
        res.status(200).cookie("aAuth", "bearer " + token, {
            expiresIn: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
            secure: process.env.NODE_ENV == "development" ? true : false,
            HttpOnly: process.env.NODE_ENV == "development" ? true : false,
            sameSite: process.env.NODE_ENV == "development" ? true : false
        }).send({
            "status": "success",
            message: "Admin Login",
            token
        })
        logger.info("Admin Login Successfully")
    } catch (error) {
        console.log(error)
        logger.error("Error In Admin Login")
        return res.status(500).send({
            "status": "error",
            message: "Interanl Error"
        })
    }
}

export const getAdminDetails = async (req, res) => {
    try {
        const admin = req.admin
        if (!admin) {
            logger.error("Admin Not authorized Get Admin")
            return res.status(401).send({
                "status": "error",
                message: "Admin Unauthorized"
            })
        }
        const checkAdmin = await adminModel.findById(admin._id)
        if (!checkAdmin) {
            logger.error("Admin Not Found get Admin")
            return res.status(400).send({
                "status": "error",
                message: "Admin Not Found"
            })
        }
        res.status(200).send({
            "status": "success",
            message: "Admin Details",
            checkAdmin
        })
        logger.info("Get Admin Detail Successfully")
    } catch (error) {
        console.log(error)
        logger.error("Error In Get Admin Detail")
        return res.status(500).send({
            "status": "error",
            message: "Internal Error"
        })
    }
}

export const adminLogoutController = async (req, res) => {
    try {
        const user = req.admin;
        if (!user) {
            logger.error("Admin Not Authorized logout")
            return res.status(401).json({
                "status": "error",
                message: "Admin unauthorized"
            })
        }
        res.status(200).clearCookie("aAuth").json({
            "status": "success",
            message: "Admin Logout"
        })
        logger.info("Admin Logout")
    } catch (error) {
        console.log(error)
        logger.error("Error in user logout API")
        return res.status(500).json({
            "status": "error",
            message: "Internal error",
            error
        })
    }
}
