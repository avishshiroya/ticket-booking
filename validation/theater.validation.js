import joi from "joi"

export const addTheaterValidation = joi.object({
    name:joi.string().required().trim().messages({
        "any.required":"name is Required",
        "string.empty":"name cannot be empty"
    }),
    location:joi.string().required().trim().messages({
        "any.required":"location is Required",
        "string.empty":"location cannot be empty"
    }),
    capacity:joi.number().required().messages({
        "any.required":"capacity is Required",
        "string.empty":"capacity cannot be empty"
    }),
    totalScreens:joi.number().required().min(1).messages({
        "any.required":"Total Screesns is Required",
        "string.min":"Total Screens 1 required"
    })
})
export const updateTheaterValidation = joi.object({
    name:joi.string().trim().messages({
        "string.empty":"name cannot be empty"
    }),
    location:joi.string().trim().messages({
        "string.empty":"location cannot be empty"
    }),
    capacity:joi.number().messages({
        "string.empty":"capacity cannot be empty"
    }),
    totalScreens:joi.number().min(1).messages({
        "string.min":"Total Screens 1 required"
    })
})

export const getTheaterByNameValidation = joi.object({
    name:joi.string().required().trim().messages({
        "any.required":"name is Required",
        "string.empty":"name cannot be empty"
    })
})