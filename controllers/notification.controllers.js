import errorResponse from '../middleware/errorResponse.js'
import successResponse from '../middleware/successResponse.js'
import io from '../server.js'
import { addNotification } from '../services/notification.service.js'
import loggerPrint from '../utils/printLogger.js'
import * as notificationValidation from '../validation/notification.validation.js'
const addNotificationController = async (req,res)=>{
    try {
        const checkValidation = notificationValidation.addNotificationValidation.validate(req.body,{
            abortEarly:false
        })
        if(checkValidation.error){
            loggerPrint(req,res,checkValidation.error)
            errorResponse(res,{statusCode:413,message:checkValidation.error})
        }
        const addNotifications = await addNotification(req.body);
        if(!addNotifications._id){
            loggerPrint(req,res,"canot Add notification")

            return errorResponse(res,{statusCode:403,message:"Cannot Add Notification"})
        }
        io.emit('sendMessage',req.body.message)
        successResponse(res,{statusCode:200,data:[],message:
            "notification added"})
    } catch (error) {
        console.log(error);
        return errorResponse(res,{statusCode:500,message:error.message})
    }
}

export default {addNotificationController}