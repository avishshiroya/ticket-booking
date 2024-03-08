import categoryModel from "../models/categoryModel.js";
import trainModel from "../models/trainModels.js";
import { addTrainValidation, updateTrainValidation } from "../validation/train.validation.js";

export const addTrainController = async(req,res)=>{
    try {
        const {category,name,uniqueId,sourceStn,destinationStn,viaStations,totalDistance,classes,capacity} = req.body
        const checkDetails = addTrainValidation.validate(req.body,{
            abortEarly:false
        })
        if(checkDetails.error){
            return res.status(400).json({
                status:"error",
                message:checkDetails.error.message,
                data:null
            })
        }
        const checkCategory = await categoryModel.findOne({name:category});
        if(!checkCategory){
            return res.status(404).json({
                status:"error",
                message:"category Not Found",
                data:null
            })
        }
        const checkUniqueId = await trainModel.findOne({uniqueId});
        if(checkUniqueId){
            return res.status(400).json({
                status:"error",
                message:"UniqueId Used Once " + uniqueId,
                data:null
            })
        }
        const train = new trainModel({
            categoryId:checkCategory._id,name,uniqueId,sourceStn,destinationStn,viaStations,totalDistance,classes,capacity,createdBy:req.admin._id
        })
        //save train
        await train.save();

        res.status(200).json({
            status:"success",
            message:'Train added Successfully',
            data:null
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            status:'error',
            message:"Internal Error",
            data:null
        })
    }
}

export const updateTrainController = async(req,res)=>{
    try {
        const {category,name,uniqueId,sourceStn,destinationStn,viaStations,totalDistance,classes,capacity} = req.body
        const checkDetails = updateTrainValidation.validate(req.body,{
            abortEarly:false
        })
        if(checkDetails.error){
            return res.status(400).json({
                status:"error",
                message:checkDetails.error.message,
                data:null
            })
        }
        const checktrain = await trainModel.findById(req.params.id);
        if(!checktrain){
            return res.status(404).json({
                status:'error',
                message:"Train not Found",
                data:null
            })
        }
        if(category){
            const checkCategory = await categoryModel.findOne({name:category});
            if(!checkCategory){
                return res.status(404).json({
                    status:"error",
                    message:"category Not Found",
                    data:null
                })
            }
            checktrain.categoryId = checkCategory._id
        }
        if(uniqueId){
            const checkUniqueId = await trainModel.findOne({uniqueId});
            if(checkUniqueId._id !=checktrain._id){
                return res.status(400).json({
                    status:"error",
                    message:"Train UniqueID used Once " + checkUniqueId.uniqueId,
                    data:null
                })
            }
        }
        if(name) checktrain.name = name
        if(uniqueId) checktrain.uniqueId = uniqueId
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
    } catch (error) {
        console.log(error);
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
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            status:"error",
            message:"Internal Error",
            data:null
        })
    }
}

export const getTrainByUniqueIdController = async(req,res)=>{
    try {
        const {uniqueId} = req.body
        const checkUniqueId = await trainModel.findOne({uniqueId});
        if(!checkUniqueId){
            return res.status(404).json({
                status:"error",
                message:"train Not Found",
                data:null
            })
        }
        res.status(200).json({
            staus:"success",
            message:"Train of " + uniqueId,
            data:checkUniqueId
        })
    } catch (error) {
        console.log(error);
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
            return res.status(404).json({
                status:"error",
                message:"Train Not",
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
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            status:"error",
            message:"Internal Error",
            data:null
        })
    }
}