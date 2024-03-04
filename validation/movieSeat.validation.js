import joi from 'joi'

export const addMovieSeatsValidation = joi.object({
    row: joi.string().length(1).required().messages({
        "any.required": "Row Name Must Be Required",
        "string.empty": "Row Name Cannot Be Empty"
    }),
    startNo: joi.number().required().messages({
        "any.required": "Seat starting number must be required",
        "number.empty": "stating number cannot be empty"
    })
    ,
    endNo: joi.number().required().messages({
        "any.required": "Seat ending number must be required",
        "number.empty": "ending number cannot be empty"
    })
    ,
    movieSlotId: joi.string().hex().required().messages({
        "any.required": "Movie Time Slot Must Be Required",
        "string.empty": "Movie Time Slot Cannot Be Empty"
    }),
    price: joi.number().required().messages({
        "any.required": "Price Must Be Required",
        "number.empty": "price Cannot Be Empty"
    })
})