import joi from "joi"

export const addPromoCodeVAlidation = joi.object({
    code:joi.string().required().trim().messages({
        "any.required":"PromoCode Name Must Be Required",
        "string.empty":"PromoCode can't Empty"
    }),
    percentage:joi.number().required().min(0).max(100).messages({
        "any.required":"Promocode percentage must be required",
        "number.min":"promocode percentage minimum 0%",
        "number.max":"promocode percentage maximum 100%"
    }),
    description:joi.string().required().trim().messages({
        "any.required":"promocode description muct be required",
        "string.empty":"Decription can't empty"
    })
})

export const updatePromoCodeVAlidation = joi.object({
    code:joi.string().trim().messages({
        "string.empty":"PromoCode can't Empty"
    }),
    percentage:joi.number().min(0).max(100).messages({
        "number.min":"promocode percentage minimum 0%",
        "number.max":"promocode percentage maximum 100%"
    }),
    description:joi.string().trim().messages({
        "string.empty":"Decription can't empty"
    })
})