import joi from "joi";

export const movieAddValidation = joi.object({
    title: joi.string().required().trim().messages({
        "any.required": "Movie Title required",
        "string.empty": "Movie Title cannot be empty"
    }),
    genre: joi.string().required().trim().messages({
        "any.required": "Movie genre required",
        "string.empty": "Movie genre cannot be empty"
    }),
    releaseYear: joi.string().length(4).messages({
        "any.required": "Movie releaseYear required",
        "string.empty": "Movie releaseYear cannot be empty",
        "string.length":"releaseyear in 4 letters"
    }),
    IMDB_rating: joi.number().min(0).max(10).messages({
        "any.required": "Movie IMDB_rating required",
        "string.empty": "Movie IMDB_rating cannot be empty"
    }),
    duration: joi.string().required().trim().messages({
        "any.required": "Movie duration required",
        "string.empty": "Movie duration cannot be empty"
    }),
    casts: joi.array().items(joi.string()).messages({
        "any.required": "Movie casts required",
        "string.empty": "Movie casts cannot be empty"
    }),
    category:joi.string().required().trim().messages({
        "any.required": "category required",
        "string.empty": "Category cannot be empty"
    })
})

export const movieAUpdateValidation = joi.object({
    category:joi.string().trim().messages({
        "string.empty": "Category cannot be empty"
    }),
    title: joi.string().trim().messages({
        "string.empty": "Movie Title cannot be empty"
    }),
    genre: joi.string().trim().messages({
        "string.empty": "Movie genre cannot be empty"
    }),
    releaseYear: joi.string().length(4).messages({
        "string.empty": "Movie releaseYear cannot be empty",
        "string.length":"releaseyear in 4 letters"
    }),
    IMDB_rating: joi.number().min(0).max(10).messages({
        "string.empty": "Movie IMDB_rating cannot be empty"
    }),
    duration: joi.string().trim().messages({
        "string.empty": "Movie duration cannot be empty"
    }),
    casts: joi.array().items(joi.string()).messages({
        "string.empty": "Movie casts cannot be empty"
    })
})