import categoryModel from "../models/categoryModel.js";
import trainModel from "../models/trainModels.js";
import logger from "../utils/logger.js";
import { addTrainValidation, updateTrainValidation } from "../validation/train.validation.js";

export const addTrainController = async(req,res)=>{
    try {
        const {category,name,license_plate,sourceStn,destinationStn,viaStations,totalDistance,classes,capacity} = req.body
        const checkDetails = addTrainValidation.validate(req.body,{
            abortEarly:false
        })
        if(checkDetails.error){
            logger.error(checkDetails.error.message + " addtrain")
            return res.status(400).json({
                status:"error",
                message:checkDetails.error.message,
                data:null
            })
        }
        const checkCategory = await categoryModel.findOne({name:category});
        if(!checkCategory){
            logger.error("category not found  addtrain")
            return res.status(404).json({
                status:"error",
                message:"category Not Found",
                data:null
            })
        }
        const checklicense_plate = await trainModel.findOne({license_plate});
        if(checklicense_plate){
            logger.error("Train license_plate Once  addtrain")
            return res.status(400).json({
                status:"error",
                message:"license_plate Used Once " + license_plate,
                data:null
            })
        }
        const train = new trainModel({
            categoryId:checkCategory._id,name,license_plate,sourceStn,destinationStn,viaStations,totalDistance,classes,capacity,//createdBy:req.admin._id
        })
        //save train
        await train.save();

        res.status(200).json({
            status:"success",
            message:'Train added Successfully',
            data:[]
        })
        logger.info("train added successfully")
    } catch (error) {
        console.log(error);
        logger.error("Error in train add")
        return res.status(500).json({
            status:'error',
            message:"Internal Error",
            data:null
        })
    }
}

export const updateTrainController = async(req,res)=>{
    try {
        const {category,name,license_plate,sourceStn,destinationStn,viaStations,totalDistance,classes,capacity} = req.body
        const checkDetails = updateTrainValidation.validate(req.body,{
            abortEarly:false
        })
        if(checkDetails.error){
            logger.error(checkDetails.error.message + " updatetrain")
            return res.status(400).json({
                status:"error",
                message:checkDetails.error.message,
                data:null
            })
        }
        const checktrain = await trainModel.findById(req.params.id);
        if(!checktrain){
            logger.error("train not found updatetrain")
            return res.status(404).json({
                status:'error',
                message:"Train not Found",
                data:null
            })
        }
        if(category){
            const checkCategory = await categoryModel.findOne({name:category});
            if(!checkCategory){
                logger.error("category not found  updatetrain")
                return res.status(404).json({
                    status:"error",
                    message:"category Not Found",
                    data:null
                })
            }
            checktrain.categoryId = checkCategory._id
        }
        if(license_plate){
            const checklicense_plate = await trainModel.findOne({license_plate});
            if(checklicense_plate._id !=checktrain._id){
                logger.error("train license_plate once  updatetrain")
                return res.status(400).json({
                    status:"error",
                    message:"Train license_plate used Once " + checklicense_plate.license_plate,
                    data:null
                })
            }
        }
        if(name) checktrain.name = name
        if(license_plate) checktrain.license_plate = license_plate
        if(sourceStn) checktrain.sourceStn = sourceStn
        if(destinationStn) checktrain.destinationStn = destinationStn
        if(viaStations) checktrain.viaStations = viaStations
        if(totalDistance) checktrain.totalDistance = totalDistance
        if(classes) checktrain.classes = classes
        if(capacity) checktrain.capacity = capacity
        //update train
        await checktrain.save();
        res.status(200).json({
            status:"success",
            message:"Train updated Successfully"
        })
        logger.info("train updated successfully")
    } catch (error) {
        console.log(error);
        logger.error("Error in update train")
        return res.status(500).json({
            status:"error",
            message:"Internal Error",
            data:null
        })
    }
}
export const getAllTrainController = async(req,res)=>{
    try {
        const getTrains = await trainModel.find({});
        if(!getTrains[0]){
            logger.error("train not found  getalltrain")
            return res.status(404).json({
                status:"error",
                message:"Trains Not Found",
                data:null
            })
        }
        res.status(200).json({
            status:"success",
            message:"All Trains",
            data:getTrains
        })
        logger.info("get all train")
    } catch (error) {
        console.log(error)
        logger.error("Error in Getalltrain")
        return res.status(500).json({
            status:"error",
            message:"Internal Error",
            data:null
        })
    }
}

export const getTrainBylicensePlateController = async(req,res)=>{
    try {
        const {license_plate} = req.body
        const checklicense_plate = await trainModel.findOne({license_plate});
        if(!checklicense_plate){
            logger.error("train not found gettrainbylicense_plate")
            return res.status(404).json({
                status:"error",
                message:"train Not Found",
                data:null
            })
        }
        res.status(200).json({
            staus:"success",
            message:"Train of " + license_plate,
            data:checklicense_plate
        })
        logger.info("get train by license_plate")
    } catch (error) {
        console.log(error);
        logger.error("Error in get train bu license_plate")
        return res.status(500).json({
            status:"error",
            message:"Iternal Error",
            data:null
        })
    }
}

export const deleteTrainController = async (req,res)=>{
    try {
        const checkTrain = await trainModel.findById(req.params.id);
        if(!checkTrain){
            logger.error("train not found  deletetrain")
            return res.status(404).json({
                status:"error",
                message:"Train Not Found",
                data:null
            })
        }
        //delete train
        await checkTrain.deleteOne();
        res.status(200).json({
            status:"success",
            message:"Train Deleted",
            data:null
        })
        logger.info("Train deleted")
    } catch (error) {
        console.log(error);
        logger.error("Error in Deletetrain")
        return res.status(500).send({
            status:"error",
            message:"Internal Error",
            data:null
        })
    }
}