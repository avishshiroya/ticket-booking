import promoCodeModel from "../models/promoCode.js";
import { addPromoCodeVAlidation, updatePromoCodeVAlidation } from "../validation/promocode.validation.js";

export const AddPromoCodeController = async (req, res) => {
    try {
        const { code, percentage, description } = req.body
        const checkDetails = addPromoCodeVAlidation.validate(req.body, {
            abortEarly: false
        })
        if (checkDetails.error) {
            return res.status(401).josn({
                status: "error",
                message: checkDetails.error.message,
                data: null
            })
        }
        const checkPromoCode = await promoCodeModel.findOne({ code });
        if (checkPromoCode) {
            return res.status(401).json({
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
    } catch (error) {
        console.log(error);
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
            return res.status(401).json({
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
    } catch (error) {
        console.log(error)
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
            return res.status(401).json({
                status: "error",
                message: checkDetails.error.message,
                data: null
            })
        }
        const checkPromoCode = await promoCodeModel.findById(req.params.id)
        if (!checkPromoCode) {
            return res.status(401).json({
                status: "error",
                message: "PromoCode Not Found",
                data: null
            })
        }
        const checkPromoCodeName = await promoCodeModel.findOne({ code });
        if (checkPromoCodeName) {
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
    } catch (error) {
        console.log(error);
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
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            status: "error",
            message: 'Internal Error',
            data: null
        })
    }
}