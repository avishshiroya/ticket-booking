import joi from "joi"

export const theaterScreenAddValidation = joi.object({
    theaterId : joi.string().hex().required().trim().messages({
        "any.required":"Theater Required",
        "string.empty":"Theater Cannot be Empty"
    }),
    screenType:joi.string().required().empty().messages({
        "any.required":"screenType Required",
        "string.empty":"screenType Cannot be Empty"
    })

})

export const theaterScreenUpdateValidation = joi.object({
    screenType:joi.string().required().empty().messages({
        "any.required":"screenType Required",
        "string.empty":"screenType Cannot be Empty"
    })
})

export const theaterScreenOnTheaterValidation= joi.object({
    theaterName:joi.string().required().empty().messages({
        "any.required":"screenType Required",
        "string.empty":"screenType Cannot be Empty"
    })
})