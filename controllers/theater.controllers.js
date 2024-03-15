import theaterScreenModel from "../models/theaterScreen.js";
import theaterModel from "../models/theatersModel.js";
import logger from "../utils/logger.js";
import { addTheaterValidation, getTheaterByNameValidation, updateTheaterValidation } from "../validation/theater.validation.js";

export const addTheaterController = async (req, res) => {
    try {
        const { name, location, capacity, totalScreens } = req.body
        const checkDetails = addTheaterValidation.validate(req.body, {
            abortEarly: false
        })
        if (checkDetails.error) {
            logger.error(checkDetails.error.message + " addtheater") 
            return res.status(400).send({
                "status":"error",
                message: checkDetails.error.message
            })
        }
        const theater = new theaterModel({
            name, location, capacity, totalScreens
        })
        await theater.save();
        res.status(200).send({
            "status":"success",
            message: "Theater Created ",
            theater
        })
        logger.info("Theater created")
    } catch (error) {
        console.log(error);
        logger.error("Error in add theater")
        return res.status(500).send({
            "status":"error",
            message: "Internal Error ",
            error
        })
    }
}
export const getAllTheaterController = async (req, res) => {
    try {
        const theaters = await theaterModel.find({});
        if (!theaters[0]) {
            logger.error("Theater not found  getalltheater")
            return res.status(400).send({
                "status":"success",
                message: "Please Add Theaters"
            })
        }
        res.status(200).send({
            "status":"success",
            message: "Get All Theaters",
            data:theaters
        })
        logger.info("GEt all theater")
    } catch (error) {
        console.log(error);
        logger.error("error in get6 all theater")
        return res.status(400).send({
            "status":"success",
            message: "Internal Error",
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
            logger.error(isNameVAlidate.error.message + " gettheaterbyname")
            return res.status(400).send({
                "status":"error",
                message: isNameVAlidate.error.message
            })
        }
        const getTheater = await theaterModel.find({ name: { $regex: new RegExp(name, 'i') } });
        if (!getTheater[0]) {
            logger.error("theater not found  gettheaterbyname")
            return res.status(400).send({
                "status":"error",
                message: "Theater Not Found"
            })
        }
        res.status(200).send({
            "status":"success",
            message: "Get All Theaters Of " + name,
            getTheater
        })
        logger.info("get all theater by name")
    } catch (error) {
        console.log(error);
        logger.error("Error in get theater by name")
        return res.status(400).send({
            "status":"success",
            message: "Internal Error",
            error
        })
    }
}
export const updateTheaterController = async (req, res) => {
    try {
        const { name, location, totalScreens, capacity } = req.body
        const checkDetails = updateTheaterValidation.validate(req.body, {
            abortEarly: false
        })
        if (checkDetails.error) {
            logger.error(checkDetails.error.message +" update theater")
            return res.status(400).send({
                "status":"success",
                message: checkDetails.error.message
            })
        }
        const checkTheater = await theaterModel.findById(req.params.id);
        if (!checkTheater) {
            logger.error("theater not found    updatetheater")
            return res.status(400).send({
                "status":"error",
                message: "Theater Not Found"
            })
        }
        if (name) checkTheater.name = name;
        if (location) checkTheater.location = location;
        if (totalScreens) checkTheater.totalScreens = totalScreens;
        if (capacity) checkTheater.capacity = capacity;

        //save theater
        await checkTheater.save();

        res.status(200).send({
            "status":"success",
            message: "Update the theater",
            checkTheater
        })
        logger.info("update theater")
    } catch (error) {
        console.log(error)
        logger.error("Error in update theater")
        return res.status(400).send({
            "status":"error",
            message: "Internal Error"
        })
    }
}
export const deleteTheaterController = async (req, res) => {
    try {
        const checkTheater = await theaterModel.findById(req.params.id);
        if (!checkTheater) {
            logger.error("theater not found  deletetheater")
            return res.status(400).send({
                "status":"error",
                message: "Theater Not Found"
            })
        }
        const checkScreen = await theaterScreenModel.find({ theaterId: req.params.id });
        if (checkScreen[0]) {
            logger.error("delete first theater screen  delete theater")
            return res.status(200).send({
                "status":"error",
                message: "Please Delete First Theater screens"
            })
        }
        //delete the theater
        const deleteTheater = await checkTheater.deleteOne();
        if (!deleteTheater) {
            logger.error("theater not deleted")
            return res.status(400).send({
                "status":"error",
                message: "Theater cannot delete"
            })
        }
        res.status(200).send({
            "status":"success",
            message: "Theater delete",
            checkTheater
        })
        logger.info("theater deleted")
    } catch (error) {
        console.log(error)
        logger.error("Error in delete theater")    
        return res.status(400).send({
            "status":"error",
            message: "Invalid Error",
            error
        })
    }
}