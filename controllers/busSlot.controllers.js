import routesModel from "../models/RoutesModels.js"
import busModel from "../models/busModels.js"
import busSlotModel from "../models/busSlotModels.js"
import { addBusSlotValidation, getBusSlotByRoutesValidation, updateBusSlotValidation } from "../validation/busSlot.validation.js"

export const busSlotAddController = async (req, res) => {
    try {
        const { busId, routeId, arrivalTime, despatureTime, viaStops, despatureDate, arrivalDate, totalDistance, travellingHours } = req.body

        const checkDetails = addBusSlotValidation.validate(req.body, {
            abortEarly: false
        })
        if (checkDetails.error) {
            return res.status(400).json({
                status: "failed",
                message: checkDetails.error.message,
                data: null
            })
        }

        const checkBusId = await busModel.findById(busId);
        if (!checkBusId) {
            return res.status(404).json({
                status: "error",
                message: "Bus Not Found",
                data: null
            })
        }
        const checkRouteId = await routesModel.findById(routeId)
        if (!checkRouteId) {
            return res.status(404).json({
                status: "error",
                message: "Route Not Found",
                data: null
            })
        }
        const checkBusSlotOnTime = await busSlotModel.findOne({ busId, arrivalTime, arrivalDate });
        if (checkBusSlotOnTime) {
            return res.status(401).json({
                status: "error",
                message: 'Slot Once booked Allready on time' + arrivalTime + " " + arrivalDate,
                data: null
            })
        }
        // const despatureDate = new Date(arrivalDate) + travellingHours * 60 * 60 * 1000;
        // console.log(despatureDate)
        const busSlot = new busSlotModel({
            busId, routeId, arrivalTime, despatureTime, viaStops, arrivalDate, despatureDate, totalDistance, travellingHours, createdBy: req.admin._id
        })
        //save busSlot
        await busSlot.save();
        res.status(200).json({
            status: "success",
            message: "busSlot Added Successfully",
            data: null
        })
    } catch (error) {
        console.log(error)
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
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            status: "error",
            message: "Internal Error",
            data: null
        })
    }
}

export const updateBusSlotController = async (req, res) => {
    try {
        const { routeId, arrivalTime, despatureTime, viaStops, arrivalDate, despatureDate, totalDistance, travellingHours } = req.body
        const checkDetails = updateBusSlotValidation.validate(req.body, { abortEarly: false })
        if (checkDetails.error) {
            return res.status(400).json({
                status: "error",
                message: checkDetails.error.message,
                data: null
            })
        }
        const checkBusSlot = await busSlotModel.findById(req.params.id);
        if (!checkBusSlot) {
            return res.status(404).json({
                status: "error",
                message: "busSlot Not Found",
                data: null
            })
        }
        if (routeId) {
            const checkRouteId = await routesModel.findById(routeId)
            if (!checkRouteId) {
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
        if (despatureTime) checkBusSlot.despatureTime = despatureTime
        if (viaStops) checkBusSlot.viaStops = viaStops
        if (arrivalDate) checkBusSlot.arrivalDate = arrivalDate
        if (totalDistance) checkBusSlot.totalDistance = totalDistance
        if (travellingHours) checkBusSlot.travellingHours = travellingHours
        if (despatureDate) checkBusSlot.despatureDate = despatureDate
        if (req.admin._id) checkBusSlot.updatedBy = req.admin._id
        //save the busslot
        await checkBusSlot.save();
        res.status(200).json({
            status: "success",
            message: "BusSlot Updated Successfully"
        })
    } catch (error) {
        console.log(error)
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
    } catch (error) {
        console.log(error)
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
            return res.status(400).json({
                status:"error",
                message:checkDetails.error.message,
                data:null
            })
        }
        const findRoutes = await routesModel.findOne({categoryId,from,to})
        if(!findRoutes){
            return res.status(404).json({
                status:"error",
                message:"oops !! no one bus for this routes"
            })
        }
        const findBusSlot = await busSlotModel.find({routeId:findRoutes._id,arrivalDate:date});
        if(!findBusSlot[0]){
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
        return res.status(500).json({
            status:"error",
            message:"Internal Error",
            data:null
        })
    }
}