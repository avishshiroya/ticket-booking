import promoCodeModel from "../models/promoCode.js";
import logger from "../utils/logger.js";
import { addPromoCodeVAlidation, updatePromoCodeVAlidation } from "../validation/promocode.validation.js";

export const AddPromoCodeController = async (req, res) => {
    try {
        const { code, percentage, description } = req.body
        const checkDetails = addPromoCodeVAlidation.validate(req.body, {
            abortEarly: false
        })
        if (checkDetails.error) {
            logger.error(checkDetails.error.message + " addpromocode")
            return res.status(400).josn({
                status: "error",
                message: checkDetails.error.message,
                data: null
            })
        }
        const checkPromoCode = await promoCodeModel.findOne({ code });
        if (checkPromoCode) {
            logger.error("Promocode cannot unique  addpromocode")
            return res.status(400).json({
                status: "error",
                message: "PromoCode Name Must Be unique"
            })
        }
        const promocode = new promoCodeModel({
            code, percentage, description, createdBy: req.admin._id
        })

        await promocode.save();
        res.status(200).json({
            status: "success",
            message: "PromoCode Add Successfully",
            data: null
        })
        logger.info("Promocode added")
    } catch (error) {
        console.log(error);
        logger.error("Error in add Promocode")
        return res.status(500).josn({
            status: "error",
            message: "Internal Server Error"
        })
    }
}

export const getPromoCodesController = async (req, res) => {
    try {
        const allPromo = await promoCodeModel.find({});
        if (!allPromo[0]) {
            logger.error("promocode not found  getpromocodes")
            return res.status(400).json({
                status: "error",
                message: "PromoCode Not Found",
                data: null
            })
        }
        res.status(200).json({
            status: "success",
            message: "PromoCodes",
            data: allPromo
        })
        logger.info("Promocode Get successfully")
    } catch (error) {
        console.log(error)
        logger.error("Error in getallpromocode")
        return res.status(500).json({
            status: "error",
            message: "Internal Server Error",
            data: null
        })
    }
}

export const updatePromoCodeController = async (req, res) => {
    try {
        const { code, percentage, description } = req.body
        const checkDetails = updatePromoCodeVAlidation.validate(req.body, {
            abortEarly: false
        })
        if (checkDetails.error) {
            logger.error(checkDetails.error.message + " update promocode")
            return res.status(401).json({
                status: "error",
                message: checkDetails.error.message,
                data: null
            })
        }
        const checkPromoCode = await promoCodeModel.findById(req.params.id)
        if (!checkPromoCode) {
            logger.error("promocode not found  updatePromocode")
            return res.status(401).json({
                status: "error",
                message: "PromoCode Not Found",
                data: null
            })
        }
        const checkPromoCodeName = await promoCodeModel.findOne({ code });
        if (checkPromoCodeName) {
            logger.error("Promocode Must be unique  updatepromocode")
            return res.status(401).json({
                status: "error",
                message: "PromoCode name Must Be Unique",
                data: null
            })
        }
        if (code) checkPromoCode.code = code;
        if (percentage) checkPromoCode.percentage = percentage;
        if (description) checkPromoCode.description = description;
        //update details
        await checkPromoCode.save();
        res.status(200).json({
            status: "success",
            message: "PromoCode Update Successfully",
            data: null
        })
        logger.info("Promocode update successfully")
    } catch (error) {
        console.log(error);
        logger.error("Error in updatepromocode")
        return res.status(500).json({
            status: "error",
            message: "Internal Error",
            data: null
        })
    }
}
export const deletePromoCodeController = async (req, res) => {
    try {
        const checkPromoCode = await promoCodeModel.findById(req.params.id);
        if (!checkPromoCode) {
            logger.error("promocode not found  deletepromocode")
            return res.status(401).json({
                status: "error",
                message: "Promocode Not Found",
                data: null
            })
        }
        await checkPromoCode.deleteOne();
        res.status(200).send({
            status: "success",
            message: "PromoCode delete Successfully",
            data: null
        })
        logger.info("Promocode Deleted")
    } catch (error) {
        console.log(error)
        logger.error("Error in delete promode")
        return res.status(500).json({
            status: "error",
            message: 'Internal Error',
            data: null
        })
    }
}