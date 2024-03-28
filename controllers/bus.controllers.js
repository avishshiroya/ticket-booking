import busModel from "../models/busModels.js"
import categoryModel from "../models/categoryModel.js"
import { addBusValidation, updateBusValidation } from "../validation/bus.validation.js"
import logger from "../utils/logger.js"
export const addBusContoller = async (req, res) => {
    try {
        const { name, type, license_plate, categoryId, totalSeats } = req.body
        const checkDetails = addBusValidation.validate(req.body, {
            abortEarly: false
        })
        if (checkDetails.error) {
            logger.error(checkDetails.error.message + "bus")
            return res.status(400).json({
                status: "error",
                message: checkDetails.error.message,
                data: null
            })
        }
        const checkCategory = await categoryModel.findById(categoryId);
        if (!checkCategory) {
            logger.error("Category Not Found bus")
            return res.status(404).json({
                status: "error",
                message: "Category Not Found",
                data: null
            })
        }
        const checklicense_plate = await busModel.findOne({ license_plate });
        if (checklicense_plate) {
            logger.error("Bus number used Once")
            return res.status(400).json({
                status: "error",
                message: "license_plate use Onces",
                data: null
            })
        }
        const bus = new busModel({
            name, type, license_plate, categoryId, totalSeats, createdBy: req.admin._id
        })
        //save bus model
        await bus.save();
        res.status(200).json({
            status: "success",
            message: "Bus Add Successfully",
            data: null
        })
        logger.info("Bus Added Successfully")
    } catch (error) {
        console.log(error)
        logger.error("Error in Bus Add")
        return res.status(500).json({
            status: "error",
            message: "Internal Error",
            data: null
        })
    }
}

export const updateBusController = async (req, res) => {
    try {
        const { name, type, license_plate, categoryId, totalSeats } = req.body
        const checkDetails = updateBusValidation.validate(req.body, {
            abortEarly: false
        })
        if (checkDetails.error) {
            logger.error(checkDetails.error.message + "Bus update")
            return res.status(400).json({
                status: "error",
                message: checkDetails.error.message,
                data: null
            })
        }
        const checkBus = await busModel.findById(req.params.id);
        if (!checkBus) {
            logger.error("Bus Not Found bus update")
            return res.status(404).json({
                status: "error",
                message: "Bus Not Found",
                data: null
            })
        }
        if (categoryId) {
            const checkCategory = await categoryModel.findById(categoryId)
            if (!checkCategory) {
                logger.error("Category Not Found busupdate")
                return res.status(404).json({
                    status: "error",
                    message: "Category Not Found",
                    data: null
                })
            }
        }
        if (license_plate) {
            const checklicense_plate = await busModel.findOne({ license_plate })
            if (checklicense_plate.license_plate == checkBus.license_plate) {
                console.log("license_plate match")
            } else {
                logger.error("Unique id Used Once bus update")
                return res.status(401).json({
                    status: "error",
                    message: "license_plate allready Used Once",
                    data: null
                })
            }
        }
        if (name) checkBus.name = name
        if (type) checkBus.type = type
        if (license_plate) checkBus.license_plate = license_plate
        if (categoryId) checkBus.categoryId = categoryId
        if (totalSeats) checkBus.totalSeats = totalSeats
        if (req.admin._id) checkBus.updatedBy = req.admin._id

        //update bus
        await checkBus.save();
        res.status(200).json({
            status: "success",
            message: "Bus Updated Successfully",
            data: null
        })
        logger.info("Bus Updated successfuuly")
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            status: "error",
            message: 'Internal Error',
            data: null
        })
    }
}

export const getAllBusController = async (req,res)=>{
    try {
        const AllBuses = await busModel.find({});
        if(!AllBuses[0]){
            logger.error("Buses Not found GetAllBus")
            return res.status(404).json({
                status:"error",
                message:"Buses Not Found",
                data:null
            })
        }
        res.status(200).json({
            status:"success",
            message:"All Buses",
            data:AllBuses
        })
        // logger.info("Get All Bus")
        logger.info( `${req.method} ${req.originalUrl} ${req.headers['user-agent']} ${res.statusCode}  Get All Buses`)

    } catch (error) {
        console.log(error)
        logger.error("Error in Get All Bus")
        return res.status(500).json({
            status:"error",
            message:"Internal Error",
            data:null
        })
    }
}

export const getBusOnNameController = async(req,res)=>{
    try {
        const {name} = req.body
        const buses = await busModel.find({name});
        if(!buses[0]){
            logger.error("Buses Not Found GetBusOnName")
            return res.status(404).json({
                status:"error",
                message:"Buses not Found",
                data:null
            })
        }
        res.status(200).json({
            status:"success",
            message:"Buses Of " +name,
            data:buses
        })
        logger.info("Get Bus on Name Successfully")
    } catch (error) {
        console.log(error)
        logger.error("Error In GetBusOnName ")
        return res.status(500).json({
            status:"error",
            message:"Internal Error"
        })
    }
}
export const getBusOnlicensePlateController = async(req,res)=>{
    try {
        const {license_plate} = req.body
        const buses = await busModel.findOne({license_plate});
        if(!buses){
            logger.error("Cannot Get bus on license_plate")
            return res.status(404).json({
                status:"error",
                message:"Bus not Found",
                data:null
            })
        }
        res.status(200).json({
            status:"success",
            message:"Buses Of " +license_plate,
            data:buses
        })
        logger.info("Get Bus Usin license_plate")
    } catch (error) {
        console.log(error)
        logger.error("Error in get bus by license_plate")
        return res.status(500).json({
            status:"error",
            message:"Internal Error"
        })
    }
}

export const deleteBusController = async(req,res)=>{
    try {
       const checkBus = await busModel.findById(req.params.id) ;
       if(!checkBus){
        logger.error("Bus Not Found Deletebus")
        return res.status(404).json({
            status:"error",
            message:"Bus Not Found",
            data:null
        })
       }
       //delete bus
       await checkBus.deleteOne();
        res.status(200).json({
            status:"success",
            message:"Bus Deleted Successfully",
            data:null
       })
       logger.info("Bus Deleted successfully")
    } catch (error) {
        console.log(error);
        logger.error("Error In Delete Bus Controller")
        return res.status(500).json({
            status:'error',
            message:"Internal Error",
            data:null
        })
    }
}