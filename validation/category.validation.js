import joi from "joi";

export const categoryAddValidation = joi.object({
    name:joi.string().required().trim().messages({
        "any.required":"Name must be required",
        "string.empty":"Name can not be empty"
    }),
    type:joi.string().required().trim().messages({
        "any.required":"Type must be required",
        "string.empty":"Type can not be empty"
    })
})

export const categoryUpdateValidation = joi.object({
    name:joi.string().trim().messages({
        "any.required":"Name must be required",
        "string.empty":"Name can not be empty"
    }),
    type:joi.string().trim().messages({
        "any.required":"Type must be required",
        "string.empty":"Type can not be empty"
    })
})