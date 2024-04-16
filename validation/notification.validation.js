import joi from "joi";

export const addNotificationValidation = joi.object({
    message:joi.string().required().trim().messages({
        "any.required":"Message must be required",
        "string.empty":"Message Cannot Be Empty"
    })
})