import joi from "joi"

export const addTrainValidation = joi.object({
    category:joi.string().required().trim().messages({
        "any.required":"Category Must be required",
        "string.empty":"category cannot be empty"
    }),
    name:joi.string().required().trim().messages({
        "any.required":"name must be required",
        "string.empty":"Train Name Cannot be empty"
    }),
    license_plate:joi.string().required().length(8).trim().messages({
        "any.required":"train license_plate Required",
        "string.empty":"Train's license_plate cannot be empty",
        "string.length":"train license_plate have Must be 8 Character"
    }),
    sourceStn:joi.string().required().trim().messages({
        "any.required":"SourceStn must be required",
        "string.empty":"Train sourceStn Cannot be empty"
    }),
    destinationStn:joi.string().required().trim().messages({
        "any.required":"destinationStn must be required",
        "string.empty":"Train destinationStn Cannot be empty"
    }),
    viaStations:joi.array().required().messages({
        "any.required":"viaStations Must Be Required",
        "array.empty":"viaStations cannot be empty"
    }),
    totalDistance:joi.number().required().messages({
        "any.required":"Total Distance Must Be Required",
        "string.empty":'Total Distance of route cannot be empty'
    }),
    classes:joi.array().required().messages({
        "any.required":"Train classes Must Be Required",
        "array.empty":"Train classes cannot be empty"
    }),
    capacity:joi.number().required().messages({
        "any.required":"Total Distance Must Be Required",
        "string.empty":'Total Distance of route cannot be empty'
    }),
    aAuth:joi.string().messages({
        "string.empty":'authentication token cannot be empty'
    }),
})
export const updateTrainValidation = joi.object({
    category:joi.string().trim().messages({
        "string.empty":"category cannot be empty"
    }),
    name:joi.string().trim().messages({
        "string.empty":"Train Name Cannot be empty"
    }),
    uniqueId:joi.string().length(8).trim().messages({
        "string.empty":"Train's uniqueid cannot be empty",
        "string.length":"train UniqueId have Must be 8 Character"
    }),
    sourceStn:joi.string().trim().messages({
        "string.empty":"Train sourceStn Cannot be empty"
    }),
    destinationStn:joi.string().trim().messages({
        "string.empty":"Train destinationStn Cannot be empty"
    }),
    viaStations:joi.array().messages({
        "array.empty":"viaStations cannot be empty"
    }),
    totalDistance:joi.number().messages({
        "string.empty":'Total Distance of route cannot be empty'
    }),
    classes:joi.array().messages({
        "array.empty":"Train classes cannot be empty"
    }),
    capacity:joi.number().messages({
        "string.empty":'Total Distance of route cannot be empty'
    }),
    aAuth:joi.string().messages({
        "string.empty":'authentication token cannot be empty'
    }),
})