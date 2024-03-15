import theaterScreenModel from "../models/theaterScreen.js"
import theaterModel from "../models/theatersModel.js"
import logger from "../utils/logger.js"
import { theaterScreenAddValidation, theaterScreenOnTheaterValidation, theaterScreenUpdateValidation } from "../validation/theaterScreen.validation.js"

export const addTheaterScreenControlller = async (req, res) => {
    try {
        const { theaterId, screenType } = req.body
        const checkValidation = theaterScreenAddValidation.validate(req.body, {
            abortEarly: false
        })
        if (checkValidation.error) {
            logger.error(checkValidation.error.message + " add theaterscreen")
            return res.status(401).send({
                "status": "error",
                message: checkValidation.error.message
            })
        }
        const checkTheater = await theaterModel.findById(theaterId);
        logger.error("theater not found addtheaterscreen")
        if (!checkTheater) {
            return res.status(401).send({
                "status": "error",
                message: "Theater Not Found"
            })
        }
        const checkTheaterTotalScreen = await theaterScreenModel.find({ theaterId: checkTheater._id });
        if (checkTheater.totalScreens == checkTheaterTotalScreen.length) {
            logger.error("added allready all screen  addtheaterscreen")
            return res.status(401).send({
                "status": "error",
                message: "You already added all screens to thaters total screens"
            })
        }
        const theaterScreen = new theaterScreenModel({
            theaterId, screenType
        })
        //save theaterScreen
        await theaterScreen.save();

        res.status(500).send({
            "status": "success",
            message: "Theater Screen Save",
            theaterScreen
        })
        logger.info("theaterscreen added successfully")
    } catch (error) {
        console.log(error)
        logger.error("Error In Add Theater Screen")
        return res.status(401).send({
            "status": "error",
            message: "Internal Error",
            error
        })
    }
}

export const getTheaterScreenController = async (req, res) => {
    try {
        const getAllTheaterScreen = await theaterScreenModel.find({});
        if (!getAllTheaterScreen[0]) {
            logger.error("not found screen  gettheaterscreen")
            return res.status(200).send({
                "status": "error",
                message: "Please Enter Screen"
            })
        }
        res.status(200).send({
            "status": "success",
            message: "get all theaters ",
            getAllTheaterScreen
        })
        logger.info("getall theater screen")
    } catch (error) {
        console.log(error);
        logger.error("Error in Get All Theater Screen")
        return res.status(500).send({
            "status": "error",
            message: "Internal Error"
        })
    }
}

export const updateTheaterScreenController = async (req, res) => {
    try {
        const { screenType } = req.body
        const checkDetails = theaterScreenUpdateValidation.validate(req.body, {
            abortEarly: false
        })
        if (checkDetails.error) {
            logger.error(checkDetails.error.message + " updatescreen")
            return res.status(401).send({
                "status": "error",
                message: checkDetails.error.message
            })
        }
        const theaterScreen = await theaterScreenModel.findById(req.params.id);
        if (!theaterScreen) {
            logger.error("screen not found  updatescreen")
            return res.status(401).send({
                "status": "error",
                message: "Theater Screen Not Found"
            })
        }
        if (screenType) theaterScreen.screenType = screenType;
        //update the theater screen
        await theaterScreen.save();
        res.status(200).send({
            "status": "success",
            message: "theaterScreen Update Successfully",
            theaterScreen
        })
        logger.info("screen updated")
    } catch (error) {
        console.log(error)
        logger.error("Error in Update theaterScreen Controller")
        return res.status(500).send({
            "status": "error",
            message: "Internal Error"
        })
    }
}

export const theaterScreenOnTheaterController = async (req, res) => {
    try {
        const { theaterName } = req.body
        const checkDetails = theaterScreenOnTheaterValidation.validate(req.body, {
            abortEarly: false
        })
        if (checkDetails.error) {
            logger.error(checkDetails.error.message + "screenbytheater")
            return res.status(401).send({
                "status": "error",
                message: checkDetails.error.message
            })
        }
        const getTheater = await theaterModel.find({ name: { $regex: new RegExp(theaterName, 'i') } });
        if (!getTheater[0]) {
            logger.error("not find theater  screenbytheater")
            return res.status(401).send({
                "status": "error",
                message: "Theater Not Found",
                data: null
            })
        }
        var theaters = [];
        getTheater.map((data, index) => {
            theaters.push(data._id)
        })
        const theaterScreen = await theaterScreenModel.find({ theaterId: { $in: theaters } }).populate("theaterId");
        if (!theaterScreen) {
            logger.error("screen not found")
            return res.status(401).send({
                "status": "error",
                message: "Theater Screen Not Found",
                data: null
            })
        }
        res.status(200).send({
            "status": "success",
            message: "Theater Screen",
            data: theaterScreen
        })
        logger.info("theater screen by theater")
    } catch (error) {
        console.log(error)
        logger.error("Errot in get theater screen on the theater controller")
        return res.status(500).send({
            "status": "error",
            message: "Internal Error"
        })
    }
}
export const deleteTheaterScreenController = async(req,res)=>{
    try {
        const deletescreen = await theaterScreenModel.findByIdAndDelete(req.params.id)
        res.status(200).json({
            status:"success",
            message:"DELETED ",
            data:null
        })
        logger.info("delete screen")
    } catch (error) {
        console.log(error);
        logger.error("Error in delete theater")
        return res.status(500).json({
            status:"error",
            message:"INTERNAL ERROR",
            data:null
        })
    }
}