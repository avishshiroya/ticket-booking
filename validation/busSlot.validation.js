import joi from "joi"

export const addBusSlotValidation = joi.object({
    busId:joi.string().hex().required().trim().messages({
        "any.required":"Bus Id Required",
        "string.empty":"Bus Id Cannot Be Empty",
        "string.hex":"Bus ID in Must Be hex"
    }),
    routeId:joi.string().hex().required().trim().messages({
        "any.required":"Route Id Required",
        "string.empty":"Route Id Cannot Be Empty",
        "string.hex":"Route ID in Must Be hex"
    }),
    arrivalTime:joi.string().required().trim().messages({
        "any.required":"Arrival Time Must Be Rquired",
        "string.empty":'Arrival Time Cannot Be Empty'
    }),
    depatureTime:joi.string().required().trim().messages({
        "any.required":"Despature Time Must Be Rquired",
        "string.empty":'Despature Time Cannot Be Empty'
    }),
    viaStops:joi.string().required().trim().messages({
        "any.required":'via stops must be required',
        "string.empty":'ViaStops cannot be empty'
    }),
    arrivalDate:joi.date().greater('now').required().messages({
        "any.required":"ArrivalDate must Be Required",
        "date.greater":"arrival Date Is greater Than Today Date"
    }),
    depatureDate:joi.date().greater('now').required().messages({
        "any.required":"despature Date must Be Required",
        "date.greater":"despature Date Is greater Than Today Date"
    }),
    totalDistance:joi.number().required().messages({
        "any.required":"Total Distance Must Be required",
        "string.empty":"Total Distance cannot be Empty"
    }),
    travellingHours:joi.number().required().messages({
        "any.required":"travelling Hours Must Be required",
        "string.empty":"travelling Hours cannot be Empty"
    }),
})


export const updateBusSlotValidation = joi.object({
    busId:joi.string().hex().trim().messages({
        "string.empty":"Bus Id Cannot Be Empty",
        "string.hex":"Bus ID in Must Be hex"
    }),
    routeId:joi.string().hex().trim().messages({
        "string.empty":"Route Id Cannot Be Empty",
        "string.hex":"Route ID in Must Be hex"
    }),
    arrivalTime:joi.string().trim().messages({
        "string.empty":'Arrival Time Cannot Be Empty'
    }),
    despatureTime:joi.string().trim().messages({
        "string.empty":'Despature Time Cannot Be Empty'
    }),
    viaStops:joi.string().trim().messages({
        "string.empty":'ViaStops cannot be empty'
    }),
    arrivalDate:joi.date().greater('now').messages({
        "date.greater":"arrival Date Is greater Than Today Date"
    }),
    despatureDate:joi.date().greater('now').messages({
        "date.greater":"despature Date Is greater Than Today Date"
    }),
    totalDistance:joi.number().messages({
        "string.empty":"Total Distance cannot be Empty"
    }),
    travellingHours:joi.number().messages({
        "string.empty":"travelling Hours cannot be Empty"
    }),
})

export const getBusSlotByRoutesValidation = joi.object({
    from:joi.string().required().trim().messages({
        "any.required":"From Must Be required",
        "string.empty":"From cannot be empty"
    }),
    to:joi.string().required().trim().messages({
        "any.required":"To must be required",
        "string.empty":"To cannot be empty"
    }),
    date:joi.date().required().messages({
        "any.required":"date must be Required",
        "date.empty":"Booking Date cannot be empty"
    }),
    categoryId:joi.string().hex().required().trim().messages({
        "any.required":"From Must Be required",
        "string.empty":"From cannot be empty"
    })
})