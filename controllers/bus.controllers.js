import busModel from "../models/busModels.js"
import categoryModel from "../models/categoryModel"
import { addBusValidation } from "../validation/bus.validation.js"

export const addBusContoller = async (req, res) => {
    try {
        const {name,type,uniqueId,categoryId,totalSeats} = req.body
        const checkDetails = addBusValidation.validate(req.body,{
            abortEarly:false
        })
        if(checkDetails.error){
            return res.status(400).json({
                status:"error",
                message:checkDetails.error.message,
                data:null
            })
        }
        const checkCategory = await categoryModel.findById(categoryId);
        if(!checkCategory){
            return res.status(404).json({
                status:"error",
                message:"Category Not Found",
                data:null
            })
        }
        const checkUniqueId = await busModel.findOne({uniqueId});
        if(checkUniqueId){
            return res.status(400).json({
                status:"error",
                message:"Uniqueid use Onces",
                data:null
            })
        }
        const bus = new busModel({
            name,type,uniqueId,categoryId,totalSeats
        })
        //save bus model
        await bus.save();
        res.status(200).json({
            status:"success",
            message:"Bus Add Successfully",
            data:null
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            status: "error",
            message:"Internal Error",
            data:null
        })
    }
}