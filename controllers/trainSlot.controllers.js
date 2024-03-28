import routesModel from "../models/RoutesModels.js"
import seatbookingModel from "../models/busSeatBookingModels.js"
import categoryModel from "../models/categoryModel.js"
import trainModel from "../models/trainModels.js"
import trainSlotModel from "../models/trainSlotModels.js"
import logger from "../utils/logger.js"
import { addTrainSlotValidation, updateTrainSlotValidation } from "../validation/trainSlot.validation.js"

export const addTrainSlotController = async (req, res) => {
    try {
        const { trainId, routeId, viaStations, arrivalTime, depatureTime, arrivalDate, depatureDate, totalDistance, travellingHours } = req.body
        const checkDetails = addTrainSlotValidation.validate(req.body, {
            abortEarly: false
        })
        if (checkDetails.error) {
            logger.error(checkDetails.error.message + " addtrainslot")
            return res.status(400).json({
                status: "error",
                message: checkDetails.error.message,
                data: null
            })
        }
        const checkTrain = await trainModel.findById(trainId);
        if (!checkTrain) {
            logger.error("train not found  addtrainslot")
            return res.status(404).json({
                status: "error",
                message: 'Train Not Found',
                data: null
            })
        }
        const checkRoute = await routesModel.findById(routeId);
        if (!checkRoute) {
            logger.error("route not found  addtrainslot")
            return res.status(404).json({
                status: "error",
                message: 'Route Not Found',
                data: null
            })
        }
        const checkTrainSlot = await trainSlotModel.findOne({ trainId, arrivalDate, arrivalTime });
        console.log(checkTrainSlot)
        if (checkTrainSlot) {
            logger.error("train slot added allready   addtrainslot")
            return res.status(400).json({
                status: "error",
                message: "Train Slot Added Allready for " + arrivalDate + " " + arrivalTime,
                data: null
            })
        }
        const addTrainSlot = new trainSlotModel({
            trainId, routeId, viaStations, arrivalTime, depatureTime, arrivalDate, depatureDate, totalDistance, travellingHours, createdBy: req.admin._id
        })
        //add slot
        await addTrainSlot.save();
        res.status(200).json({
            status: "success",
            message: 'Trainslot Add Successfully',
            data: null
        })
        logger.info("trainslot added successfully")
    } catch (error) {
        console.log(error)
        logger.error("Error In add Train Slot")
        return res.status(500).json({
            status: "error",
            message: "Internal Error",
            data: null
        })
    }
}

export const updateTrainSlotController = async (req, res) => {
    try {
        const { trainId, routeId, viaStations, arrivalTime, depatureTime, arrivalDate, depatureDate, totalDistance, travellingHours } = req.body
        const checkDetails = updateTrainSlotValidation.validate(req.body, {
            abortEarly: false
        })
        if (checkDetails.error) {
            logger.error(checkDetails.error.message  + " updatetrainslot")
            return res.status(400).json({
                status: "error",
                message: checkDetails.error.message,
                data: null
            })
        }
        const checktrainSlot = await trainSlotModel.findById(req.params.id);
        if (!checktrainSlot) {
            logger.error("train slot not found  updatetrainslot")
            return res.status(404).json({
                status: "error",
                message: "Train Slot Not Found",
                data: null
            })
        }
        if (trainId) {
            const checkTrain = await trainModel.findById(trainId);
            if (!checkTrain) {
                logger.error("train not found  updatetrainslot")
                return res.status(404).json({
                    status: "error",
                    message: 'Train Not Found',
                    data: null
                })
            }
            checktrainSlot.trainId = trainId
        }
        if (routeId) {
            const checkRoute = await routesModel.findById(routeId);
            if (!checkRoute) {
                logger.error("route not found  updatetrainslot")
                return res.status(404).json({
                    status: "error",
                    message: 'Route Not Found',
                    data: null
                })
            }
            checktrainSlot.routeId = routeId

        }
        if(viaStations)checktrainSlot.viaStations = viaStations
        if(arrivalTime)checktrainSlot.arrivalTime = arrivalTime
        if(depatureTime)checktrainSlot.depatureTime = depatureTime
        if(arrivalDate)checktrainSlot.arrivalDate = arrivalDate
        if(depatureDate)checktrainSlot.depatureDate = depatureDate
        if(totalDistance)checktrainSlot.totalDistance = totalDistance
        if(travellingHours)checktrainSlot.travellingHours = travellingHours
        if(req.admin._id)checktrainSlot.updatedBy = req.admin._id

        //save trainslot
        await checktrainSlot.save();

        res.status(200).json({
            staus:"success",
            message:"train Slot updated",
            data:null
        })
        logger.info("train slot created")
    } catch (error) {
        console.log(error)
        logger.error("Error in add train slot")
        return res.status(500).json({
            status: "error",
            message: "Invalid Error",
            data: null
        })
    }
}

export const getTrainSlotByRoutesController = async (req,res)=>{
    try {
        const {from,to,date} = req.body
        const getCategory = await categoryModel.findOne({name:"train"});
        if(!getCategory){
            logger.error("category not found  gettrainslotbyroutes")
            return res.status(404).json({
                status:"error",
                message:"category Not Found",
                data:null
            })
        }
        const getRoutes= await routesModel.findOne({categoryId:getCategory._id,from,to})
        if(!getRoutes){
            logger.error("routes not found  gettrainslotbyroutes")
            return res.status(404).json({
                status:"error",
                message:"Routes Not Found",
                data:null
            })
        }
        const getSlots = await trainSlotModel.find({routeId:getRoutes._id,arrivalDate:date}).populate("routeId").populate("trainId")
        if(!getSlots[0]){
            logger.error("Trainslot not found  gettrainslotbyroutes")
            return res.status(404).json({
                status:"error",
                message:"TrainSlots Not Found",
                data:null
            })
        }
        
        res.status(200).json({
            status:"Success",
            message:"Slots of Routes " +from + " to " +to,
            data:getSlots
        })
        logger.info("get trainslot by routes ")
    } catch (error) {
        console.log(error);
        logger.error("error in gettrainslotbyroutes")
        return res.status(500).json({
            status:"error",
            message:"Internal Error",
            data:null
        })
    }
}

export const deleteTrainSlotController = async(req,res)=>{
    try {
        const checkTrainSlot = await trainSlotModel.findById(req.params.id);
        if(!checkTrainSlot){
            logger.error("trainslot not found  deletetrainslot")
            return res.status(404).json({
                status:"error",
                message:"TrainSlot Not Found",
                data:null
            })
        }
        const deleteSlot = await checkTrainSlot.deleteOne();
        console.log(deleteSlot);
         res.status(200).json({
            status:"success",
            message:"Train Slot Deleted successfully",
            data:null
        })
        logger.info("Delete trainslot successfully")
    } catch (error) {
        console.log(error);
        logger.error("Error in delete trainslot")
        return res.status(500).json({
            status:"error",
            message:"Internal Error",
            data:null
        })
    }
}