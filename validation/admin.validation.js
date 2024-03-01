import joi from "joi"

export const registerAdminValidation = joi.object({
    email:joi.string().email().required().trim().messages({
        "any.required":"Email Required",
        "string.email":"Invalid Email",
        "string.empty":"Email cannot be empty"
    }),
    password:joi.string().min(8).trim().required().messages({
        "any.required":"Password must be required",
        "string.empty":"password cannot be empty",
        "string.min":"password has minimum 8 letters"
    })
})