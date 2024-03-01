import e from "express"
import joi from "joi"
export const addRoutesValidation = joi.object({
    category:joi.string().required().trim().messages({
        "any.required":"Category Must Be Required",
        "string.empty":"Category Type Cannot be empty"
    }),
    from:joi.string().required().trim().messages({
        "any.required":"From Is required",
        "string.empty":"From Cannot be empty"
    }),
    to:joi.string().required().trim().messages({
        "any.required":"To is required",
        "string.empty":"To cannot be Empty"
    })
})

export const updateRoutesValidation = joi.object({
    category:joi.string().trim().messages({
        "string.empty":"Category Type Cannot be empty"
    }),
    from:joi.string().trim().messages({
        "string.empty":"From Cannot be empty"
    }),
    to:joi.string().trim().messages({
        "string.empty":"To cannot be Empty"
    })
})

export const  checkCategoryForSearchRoutesValidation= joi.object({
    category:joi.string().required().trim().messages({
        "any.required":"Category Must Be Required",
        "string.empty":"Category Type Cannot be empty"
    })
})

export const  checkFromForSearchRoutesValidation= joi.object({
    from:joi.string().required().trim().messages({
        "any.required":"to Must Be Required",
        "string.empty":"to Type Cannot be empty"
    })
})

export const  checkToForSearchRoutesValidation= joi.object({
    to:joi.string().required().trim().messages({
        "any.required":"From Must Be Required",
        "string.empty":"From Type Cannot be empty"
    })
})