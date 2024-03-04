import joi from "joi"

export const addMovieSlotValidation = joi.object({
    showTime: joi.string().required().trim().messages({
        "any.required": "Show Time Must be Required",
        "string.empty": "Show Time cannot be empty"
    }),
    showDate: joi.date().required().messages({
        "any.required": "ShowDate must be required",
        "date.empty": "Showdate must be required"
    }),
    description: joi.string().trim().messages({
        "string.empty": "description cannot be empty"
    }),
    theaterId: joi.string().hex().required().trim().messages({
        "any.required": "Theater Required",
        "string.empty": "Theater Cannot be Empty"
    }),
    screenId: joi.string().hex().required().trim().messages({
        "any.required": "screen Required",
        "string.empty": "screen Cannot be Empty"
    }),
    movieId: joi.string().hex().required().trim().messages({
        "any.required": "movie Required",
        "string.empty": "movie Cannot be Empty"
    }),
})
export const updateMovieSlotValidation = joi.object({
    showTime: joi.string().trim().messages({
        "string.empty": "Show Time cannot be empty"
    }),
    showDate: joi.date().messages({
        "date.empty": "Showdate must be required"
    }),
    description: joi.string().trim().messages({
        "string.empty": "description cannot be empty"
    }),
    theaterId: joi.string().hex().trim().messages({
        "string.empty": "Theater Cannot be Empty"
    }),
    screenId: joi.string().hex().trim().messages({
        "string.empty": "screen Cannot be Empty"
    }),
    movieId: joi.string().hex().trim().messages({
        "string.empty": "movie Cannot be Empty"
    }),
})