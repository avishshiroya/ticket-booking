import joi from "joi";

export const registerUserValidation = joi.object({
    name: joi.string().required().trim().messages({
        "any.required": " name must be required",
        "string.empty": " name can not be empty",
    }),
    email: joi.string().email().required().trim().messages({
        "any.required": " email must be required",
        "string.empty": " Email can not be empty",
        "string.email": "Invalid Email"
    }),
    mobile: joi.string().length(10).required().messages({
        "any.required": "Mobile number must be required",
        "string.empty": "Mobile number can not be empty",
        "string.length": "Mobile number must be have 10 letter/numbers",
    }),
    DOB: joi.date().required().messages({
        "any.required": "DOB must be required"
    }),
    address: joi.string().required().trim().messages({
        "any.required": "address must be required",
        "string.empty": "Address can not be empty"
    }),
    pincode: joi.string().required().length(6).trim().messages({
        "any.required": "Pincode Must be required",
        "string.empty": "pincode cannot be empty",
        "string.length": "Pincode must be have 6 letter/numbers"
    }),
    city: joi.string().required().trim().messages({
        "any.required": "City must be required",
        "string.empty": "City cannot be empty",
    }),
    state: joi.string().required().trim().messages({
        "any.required": "state must be required",
        "string.empty": "State cannot be empty"
    }),
    country: joi.string().required().messages({
        "any.required": "Country must be required",
        "string.empty":"country canot be empty"
    })
})


export const userToSendOTP = joi.object({
    email: joi.string().email().trim().messages({
        "string.empty": " Email can not be empty",
        "string.email": "Invalid Email"
    }),
    mobile: joi.string().length(10).messages({
        "string.empty": "Mobile number can not be empty",
        "string.length": "Mobile number must be have 10 letter/numbers",
    }),
})
export const detailUpdateUserValidation = joi.object({
    name: joi.string().required().trim().messages({
        "any.required": " name must be required",
        "string.empty": " name can not be empty",
    }),
    DOB: joi.date().required().messages({
        "any.required": "DOB must be required"
    }),
    address: joi.string().required().trim().messages({
        "any.required": "address must be required",
        "string.empty": "Address can not be empty"
    }),
    pincode: joi.string().required().length(6).trim().messages({
        "any.required": "Pincode Must be required",
        "string.empty": "pincode cannot be empty",
        "string.length": "Pincode must be have 6 letter/numbers"
    }),
    city: joi.string().required().trim().messages({
        "any.required": "City must be required",
        "string.empty": "City cannot be empty",
    }),
    state: joi.string().required().trim().messages({
        "any.required": "state must be required",
        "string.empty": "State cannot be empty"
    }),
    country: joi.string().required().messages({
        "any.required": "Country must be required",
        "string.empty":"country canot be empty"
    })
})
