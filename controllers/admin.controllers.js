import adminModel from "../models/adminModels.js"
import { registerAdminValidation } from "../validation/admin.validation.js"

export const registerAdminController = async (req, res) => {
    try {
        const { email, password } = req.body
        const checkAdminDetails = registerAdminValidation.validate(req.body, {
            abortEarly: false
        })
        if (checkAdminDetails.error) {
            return res.status(401).send({
                success: false,
                message: checkAdminDetails.error.message
            })
        }
        const admin = new adminModel({
            email, password
        })
        await admin.save();
        res.status(200).send({
            success: true,
            message: "Admin register successfully"
        })
    } catch (error) {
        console.log(error)
        return res.status(401).send({
            success: false,
            message: "Error in Admin register API"
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
            return res.status(401).send({
                success: true,
                message: checkAdminDetails.error.message
            })
        }
        const checkAdminEmail = await adminModel.findOne({ email });
        if (!checkAdminEmail) {
            return res.status(401).send({
                success: false,
                message: "Admin Not Found! Check Email"
            })
        }
        const comparePassword = checkAdminEmail.comparePassword(password);
        if (!comparePassword) {
            return res.status(401).send({
                success: false,
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
            success:true,
            message:"User Login",
            token
        })
    } catch (error) {
        console.log(error)
        return res.status(401).send({
            success: false,
            message: "Error in login Admin API"
        })
    }
}

export const getAdminDetails = async(req,res)=>{
    try {
        const admin = req.admin
        if(!admin){
            return res.status(401).send({
                success:false,
                message:"Not Find Admin"
            })
        }
        const checkAdmin = await adminModel.findById(admin._id)
        if(!checkAdmin){
            return res.status(401).send({
                success:false,
                message:"Admin Not Found"
            })
        }
        res.status(200).send({
            success:true,
            message:"Admin Details",
            checkAdmin
        })
    } catch (error) {
        console.log(error)
        return res.status(401).send({
            success:false,
            message:"Error In Admin Details Get API"
        })
    }
}