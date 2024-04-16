import notificationModel from "../models/notificationModels.js"

export const addNotification = async(data)=>{
    const notification = new notificationModel({
        message:data.message
    })

    return new Promise((resolve,reject)=>{
        try {
            const savenotification =  Promise.resolve( notification.save())
            resolve(savenotification)
        } catch (error) {
            reject(error)
        }
    })
}
export const findNewNotification = async ()=>{
    const data =   await notificationModel.findOne({status:0});
    // console.log(data);
    return data
}