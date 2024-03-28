import routesModel from "../models/RoutesModels.js"
import busModel from "../models/busModels.js"
import busSlotModel from "../models/busSlotModels.js"
import { addBusSlotValidation, getBusSlotByRoutesValidation, updateBusSlotValidation } from "../validation/busSlot.validation.js"
import logger from "../utils/logger.js"
export const busSlotAddController = async (req, res) => {
    try {
        const { busId, routeId, arrivalTime, depatureTime, viaStops, depatureDate, arrivalDate, totalDistance, travellingHours } = req.body

        const checkDetails = addBusSlotValidation.validate(req.body, {
            abortEarly: false
        })
        if (checkDetails.error) {
            logger.error(checkDetails.error.message)
            return res.status(400).json({
                status: "failed",
                message: checkDetails.error.message,
                data: null
            })
        }

        const checkBusId = await busModel.findById(busId);
        if (!checkBusId) {
            logger.error('Bus Not Found Busslot')
            return res.status(404).json({
                status: "error",
                message: "Bus Not Found",
                data: null
            })
        }
        const checkRouteId = await routesModel.findById(routeId)
        if (!checkRouteId) {
            logger.error('Route Not Found Busslot')
            return res.status(404).json({
                status: "error",
                message: "Route Not Found",
                data: null
            })
        }
        const checkBusSlotOnTime = await busSlotModel.findOne({ busId, arrivalTime, arrivalDate });
        if (checkBusSlotOnTime) {
            logger.error("Slot once booked Busslot")
            return res.status(401).json({
                status: "error",
                message: 'Slot Once booked Allready on time' + arrivalTime + " " + arrivalDate,
                data: null
            })
        }
        // const depatureDate = new Date(arrivalDate) + travellingHours * 60 * 60 * 1000;
        // console.log(depatureDate)
        const busSlot = new busSlotModel({
            busId, routeId, arrivalTime, depatureTime, viaStops, arrivalDate, depatureDate, totalDistance, travellingHours, createdBy: req.admin._id
        })
        //save busSlot
        await busSlot.save();
        res.status(200).json({
            status: "success",
            message: "busSlot Added Successfully",
            data: null
        })
        logger.info("busslot added Successfully")
    } catch (error) {
        console.log(error)
        logger.error("Error in add busslot")
        return res.status(500).send({
            status: "Error",
            message: "Internal Error",
            data: null
        })
    }
}

export const getBusSlotController = async (req, res) => {
    try {
        const getAllBusSlot = await busSlotModel.find({});
        if (!getAllBusSlot[0]) {
            logger.error("Busslot not found getBusSlot")
            return res.status(404).json(
                {
                    status: "error",
                    message: "BusSlot Not Found",
                    data: null
                }
            )
        }
        res.status(200).json({
            status: "success",
            message: "BusSlots",
            data: getAllBusSlot
        })
        logger.info("get all Busslot")
    } catch (error) {
        console.log(error)
        logger.error("Error In get All busslots")
        return res.status(500).json({
            status: "error",
            message: "Internal Error",
            data: null
        })
    }
}

export const updateBusSlotController = async (req, res) => {
    try {
        const { routeId, arrivalTime, depatureTime, viaStops, arrivalDate, depatureDate, totalDistance, travellingHours } = req.body
        const checkDetails = updateBusSlotValidation.validate(req.body, { abortEarly: false })
        if (checkDetails.error) {
            logger.error(checkDetails.error.message +"updateBusSlot")
            return res.status(400).json({
                status: "error",
                message: checkDetails.error.message,
                data: null
            })
        }
        const checkBusSlot = await busSlotModel.findById(req.params.id);
        if (!checkBusSlot) {
            logger.error("Busslot Not Found UpdateBusSlot")
            return res.status(404).json({
                status: "error",
                message: "busSlot Not Found",
                data: null
            })
        }
        if (routeId) {
            const checkRouteId = await routesModel.findById(routeId)
            if (!checkRouteId) {
                logger.error("Route Not Found updateBusSlot")
                return res.status(404).json({
                    status: "error",
                    message: "Route Not Found",
                    data: null
                })
            }
        }
        if (arrivalDate && arrivalTime) {
            const checkBusSlotOnTime = await busSlotModel.findOne({ busId: checkBusSlot.busId, arrivalTime: arrivalTime || checkBusSlot.arrivalTime, arrivalDate: arrivalDate || checkBusSlot.arrivalDate });
            if (checkBusSlotOnTime) {
                if (checkBusSlotOnTime._id == checkBusSlot._id) {
                    console.log(checkBusSlotOnTime)
                } else {
                    logger.error("Slot Once Booked Allready UpdateBusSlot")
                    return res.status(401).json({
                        status: "error",
                        message: 'Slot Once booked Allready on time' + arrivalTime + " " + arrivalDate,
                        data: null
                    })
                }
            }
        }
        if (routeId) checkBusSlot.routeId = routeId
        if (arrivalTime) checkBusSlot.arrivalTime = arrivalTime
        if (depatureTime) checkBusSlot.depatureTime = depatureTime
        if (viaStops) checkBusSlot.viaStops = viaStops
        if (arrivalDate) checkBusSlot.arrivalDate = arrivalDate
        if (totalDistance) checkBusSlot.totalDistance = totalDistance
        if (travellingHours) checkBusSlot.travellingHours = travellingHours
        if (depatureDate) checkBusSlot.depatureDate = depatureDate
        if (req.admin._id) checkBusSlot.updatedBy = req.admin._id
        //save the busslot
        await checkBusSlot.save();
        res.status(200).json({
            status: "success",
            message: "BusSlot Updated Successfully"
        })
        logger.info("busslot Update Successfully")
    } catch (error) {
        console.log(error)
        logger.error("Error in Busslot update API")
        return res.status(500).json({
            status: "error",
            message: "Internal Error",
            data: null
        })
    }
}

export const deleteBusSlotController = async (req, res) => {
    try {
        const checkBusSlot = await busSlotModel.findById(req.params.id);
        if(!checkBusSlot){
            logger.error("Busslot not Found DeleteBusSlot")
            return res.status(404).json({
                status:"failed",
                message:"BusSlot Not Found",
                data:null
            })
        }
        //delete busslot

        await checkBusSlot.deleteOne();
        res.status(200).json({
            status:"success",
            message:"Bus Slot Deleted Successfully"
        })
        logger.error("Delete busslot Successfully")
    } catch (error) {
        console.log(error)
        logger.error("Error in DeleteBusslot ")
        return res.status(500).json({
            status:"error",
            message:'Internal Error',
            data:null
        })
    }
}

export const getBusSlotOnRoutesController = async (req,res)=>{
    try {
        const {from,to,date,categoryId} = req.body
        const checkDetails = getBusSlotByRoutesValidation.validate(req.body,{
            abortEarly:false
        })
        if(checkDetails.error){
            logger.error(checkDetails.error.message + " getbusslot by routes")
            return res.status(400).json({
                status:"error",
                message:checkDetails.error.message,
                data:null
            })
        }
        const findRoutes = await routesModel.findOne({categoryId,from,to})
        if(!findRoutes){
            logger.error("routes not found getbusslot by routes")
            return res.status(404).json({
                status:"error",
                message:"oops !! no one bus for this routes"
            })
        }
        const findBusSlot = await busSlotModel.find({routeId:findRoutes._id,arrivalDate:date});
        if(!findBusSlot[0]){
            logger.error("busslot not Found getbusslotbyroutes")
            return res.status(404).json({
                status:"error",
                message:"oops !! no one bus for this routes on that day"
            })
        }
        res.status(200).json({
            status:"success",
            message:"Buses Of " +from + " to " + to +" on " +date,
            data:findBusSlot
        })
    } catch (error) {
        console.log(error)
        logger.error("Error in getBusslotByRoutes")
        return res.status(500).json({
            status:"error",
            message:"Internal Error",
            data:null
        })
    }
}