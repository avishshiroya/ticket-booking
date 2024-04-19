import joi from "joi"

export const addTrainSlotValidation=joi.object({
    trainId:joi.string().hex().trim().required().messages({
        "any.required":"TrainId must Be Required",
        "string.empty":"TrainId cannot be empty"
    }),
    routeId:joi.string().hex().trim().required().messages({
        "any.required":"RouteID must Be Required",
        "string.empty":"RouteID cannot be empty"
    }),
    viaStations:joi.array().required().messages({
        "any.required":"viaStations must be Required",
        "array.empty":'viaStations cannot be empty'
    }),
    arrivalTime:joi.string().trim().required().messages({
        "any.required":"arrivalTime Must Be Required",
        "string.empty":"arrivalTime Cannot Be empty"
    }),
    depatureTime:joi.string().trim().required().messages({
        "any.required":"despatureTime Must Be Required",
        "string.empty":"despatureTime Cannot Be empty"
    }),
    arrivalDate:joi.date().greater('now').required().messages({
        "any.required":"arrivalDate Must Be Required",
        "string.empty":"arrivalDate Cannot be Empty"
    }),
    depatureDate:joi.date().greater('now').required().messages({
        "any.required":"depstureDate Must Be Required",
        "string.empty":"depstureDate Cannot be Empty"
    }),
    totalDistance:joi.number().required().messages({
        "any.required":"totalDistance Must Be required",
        "string.empty":"totalDistance Can't Be empty"
    }),
    travellingHours:joi.number().required().messages({
        "any.required":"travellingHours Must Be required",
        "string.empty":"travellingHours Can't Be empty"
    }),
})
export const updateTrainSlotValidation=joi.object({
    trainId:joi.string().hex().trim().messages({
        "string.empty":"TrainId cannot be empty"
    }),
    routeId:joi.string().hex().trim().messages({
        "string.empty":"RouteID cannot be empty"
    }),
    viaStations:joi.array().messages({
        "array.empty":'viaStations cannot be empty'
    }),
    arrivalTime:joi.string().trim().messages({
        "string.empty":"arrivalTime Cannot Be empty"
    }),
    despatureTime:joi.string().trim().messages({
        "string.empty":"despatureTime Cannot Be empty"
    }),
    arrivalDate:joi.date().greater('now').messages({
        "string.empty":"arrivalDate Cannot be Empty"
    }),
    despatureDate:joi.date().greater('now').messages({
        "string.empty":"depstureDate Cannot be Empty"
    }),
    totalDistance:joi.number().messages({
        "string.empty":"totalDistance Can't Be empty"
    }),
    travellingHours:joi.number().messages({
        "string.empty":"travellingHours Can't Be empty"
    }),
})