import busModel from "../models/busModels.js"
import categoryModel from "../models/categoryModel.js"
import { addBusValidation, updateBusValidation } from "../validation/bus.validation.js"

export const addBusContoller = async (req, res) => {
    try {
        const { name, type, uniqueId, categoryId, totalSeats } = req.body
        const checkDetails = addBusValidation.validate(req.body, {
            abortEarly: false
        })
        if (checkDetails.error) {
            return res.status(400).json({
                status: "error",
                message: checkDetails.error.message,
                data: null
            })
        }
        const checkCategory = await categoryModel.findById(categoryId);
        if (!checkCategory) {
            return res.status(404).json({
                status: "error",
                message: "Category Not Found",
                data: null
            })
        }
        const checkUniqueId = await busModel.findOne({ uniqueId });
        if (checkUniqueId) {
            return res.status(400).json({
                status: "error",
                message: "Uniqueid use Onces",
                data: null
            })
        }
        const bus = new busModel({
            name, type, uniqueId, categoryId, totalSeats, createdBy: req.admin._id
        })
        //save bus model
        await bus.save();
        res.status(200).json({
            status: "success",
            message: "Bus Add Successfully",
            data: null
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

export const updateBusController = async (req, res) => {
    try {
        const { name, type, uniqueId, categoryId, totalSeats } = req.body
        const checkDetails = updateBusValidation.validate(req.body, {
            abortEarly: false
        })
        if (checkDetails.error) {
            return res.status(400).json({
                status: "error",
                message: checkDetails.error.message,
                data: null
            })
        }
        const checkBus = await busModel.findById(req.params.id);
        if (!checkBus) {
            return res.status(404).json({
                status: "error",
                message: "Bus Not Found",
                data: null
            })
        }
        if (categoryId) {
            const checkCategory = await categoryModel.findById(categoryId)
            if (!checkCategory) {
                return res.status(404).json({
                    status: "error",
                    message: "Category Not Found",
                    data: null
                })
            }
        }
        if (uniqueId) {
            const checkUniqueId = await busModel.findOne({ uniqueId })
            if (checkUniqueId.uniqueId == checkBus.uniqueId) {
                console.log("uniqueId match")
            } else {
                return res.status(401).json({
                    status: "error",
                    message: "UniqueId allready Used Once",
                    data: null
                })
            }
        }
        if (name) checkBus.name = name
        if (type) checkBus.type = type
        if (uniqueId) checkBus.uniqueId = uniqueId
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
    } catch (error) {
        console.log(error)
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
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            status:"error",
            message:"Internal Error"
        })
    }
}
export const getBusOnuniqueIdController = async(req,res)=>{
    try {
        const {uniqueId} = req.body
        const buses = await busModel.findOne({uniqueId});
        if(!buses){
            return res.status(404).json({
                status:"error",
                message:"Bus not Found",
                data:null
            })
        }
        res.status(200).json({
            status:"success",
            message:"Buses Of " +uniqueId,
            data:buses
        })
    } catch (error) {
        console.log(error)
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
        return res.status(404).json({
            status:"error",
            message:"Bus Not Found",
            data:null
        })
       }
       //delete bus
       await checkBus.deleteOne();
       return res.status(200).json({
            status:"success",
            message:"Bus Deleted Successfully",
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