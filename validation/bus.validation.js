import joi from "joi"

export const addBusValidation = joi.object({
    name: joi.string().trim().required().messages({
        "any.required": "Bus Name Must be required",
        "string.empty": "name Cannot Be Empty"
    }),
    type: joi.string().trim().required().messages({
        "any.required": "Bus Type Must Be required",
        "string.empty":"Bus type cannot Be Empty"
    }),
    uniqueId:joi.string().trim().required().messages({
        "any.required":"Bus UniqueId must Be Required",
        "string.empty":"bus uniqueId cannot be empty"
    }),
    categoryId:joi.string().hex().trim().required().messages({
        "any.required":"Catgeory Must Required",
        "string.empty":"Category cannot Be Empty",
        "string.hex":"CategoryId In must Be Hex"
    }),
    totalSeats:joi.number().required().min(15).messages({
        "any.required":"Total Seats Must Be Required",
        "number.min":"Seats Are minimum 15 Fro register Bus",
    })
})