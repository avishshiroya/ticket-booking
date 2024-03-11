import joi from "joi"

export const addTrainSeatValidation = joi.object({
    seatClass : joi.string().required().trim().messages({
        "any.required":"seatClass Must Be Required",
        "string.empty":"seatClass Cannot be empty"
    }),
    seatStart:joi.number().required().min(1).messages({
        "any.required":"Starting number of seat Must Be Required",
        "number.min":"seatstarting number minimum 1"
    }),
    seatEnd:joi.number().required().messages({
        "any.required":"Ending Number Of Seat must be Required"
    }),
    price:joi.number().required().messages({
        "any.required":"price Of Seat must be Required"
    }),
    slotId:joi.string().hex().required().messages({
        "any.required":'train Slot Must be Selected',
        "string.empty":"trainSlot cannot be empty",
        "string.hex":"train Slot Must be in Form of hex"
    })
})