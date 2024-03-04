import theaterScreenModel from "../models/theaterScreen.js";
import theaterModel from "../models/theatersModel.js";
import { addTheaterValidation, getTheaterByNameValidation, updateTheaterValidation } from "../validation/theater.validation.js";

export const addTheaterController = async (req, res) => {
    try {
        const { name, location, capacity, totalScreens } = req.body
        const checkDetails = addTheaterValidation.validate(req.body, {
            abortEarly: false
        })
        if (checkDetails.error) {
            return res.status(401).send({
                success: false,
                message: checkDetails.error.message
            })
        }
        const theater = new theaterModel({
            name, location, capacity, totalScreens
        })
        await theater.save();
        res.status(200).send({
            success: true,
            message: "Theater Created ",
            theater
        })
    } catch (error) {
        console.log(error);
        return res.status(401).send({
            success: false,
            message: "Error In Add Theater Controller API",
            error
        })
    }
}
export const getAllTheaterController = async (req, res) => {
    try {
        const theaters = await theaterModel.find({});
        if (!theaters[0]) {
            return res.status(200).send({
                success: true,
                message: "Please Add Theaters"
            })
        }
        res.status(200).send({
            success: true,
            message: "Get All Theaters",
            theaters
        })
    } catch (error) {
        console.log(error);
        return res.status(401).send({
            success: true,
            message: "Error in the Get Theaters API",
            error
        })
    }
}
export const getTheaterByNameController = async (req, res) => {
    try {
        const { name } = req.body
        const isNameVAlidate = getTheaterByNameValidation.validate(req.body, {
            abortEarly: false
        })
        if (isNameVAlidate.error) {
            return res.status(401).send({
                success: false,
                message: isNameVAlidate.error.message
            })
        }
        const getTheater = await theaterModel.find({ name: { $regex: new RegExp(name, 'i') } });
        if (!getTheater[0]) {
            return res.status(401).send({
                success: false,
                message: "Theater Not Found"
            })
        }
        res.status(200).send({
            success: true,
            message: "Get All Theaters Of " + name,
            getTheater
        })
    } catch (error) {
        console.log(error);
        return res.status(401).send({
            success: true,
            message: "Error in the Get Theaters By Name API",
            error
        })
    }
}
export const updateTheaterController = async(req,res)=>{
    try {
        const {name,location,totalScreens,capacity} = req.body
        const checkDetails = updateTheaterValidation.validate(req.body, {
            abortEarly: false
        })
        if(checkDetails.error){
            return res.status(401).send({
                success:true,
                message:checkDetails.error.message
            })
        }
        const checkTheater = await theaterModel.findById(req.params.id);
        if(!checkTheater){
            return res.status(401).send({
                success:false,
                message:"Theater Not Found"
            })
        }
        if(name)checkTheater.name = name;
        if(location)checkTheater.location = location;
        if(totalScreens)checkTheater.totalScreens = totalScreens;
        if(capacity)checkTheater.capacity = capacity;

        //save theater
        await checkTheater.save();

        res.status(200).send({
            success:true,
            message:"Update the theater",
            checkTheater
        })
    } catch (error) {
        console.log(error)
        return res.status(401).send({
            success:false,
            message:"Error in Update Theater API"
        })
    }
}
export const deleteTheaterController = async(req,res)=>{
    try {
        const checkTheater = await theaterModel.findById(req.params.id);
        if(!checkTheater){
            return res.status(401).send({
                success:false,
                message:"Theater Not Found"
            })
        }
        const checkScreen = await theaterScreenModel.find({theaterId:req.params.id});
        if(checkScreen[0]){
            return res.status(200).send({
                success:false,
                message:"Please Delete First Theater screens"
            })
        }
        //delete the theater
        const deleteTheater = await checkTheater.deleteOne();
        if(!deleteTheater){
            return res.status(401).send({
                success:false,
                message:"Theater cannot delete"
            })
        }
        res.status(200).send({
            success:true,
            message:"Theater delete",
            checkTheater
        })
    } catch (error) {
        console.log(error)
        return res.status(401).send({
            success:false,
            message:"Error in Delete Theater Controller",
            error
        })
    }
}