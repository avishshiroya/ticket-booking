import theaterScreenModel from "../models/theaterScreen.js"
import theaterModel from "../models/theatersModel.js"
import { theaterScreenAddValidation, theaterScreenOnTheaterValidation, theaterScreenUpdateValidation } from "../validation/theaterScreen.validation.js"

export const addTheaterScreenControlller = async (req, res) => {
    try {
        const { theaterId, screenType } = req.body
        const checkValidation = theaterScreenAddValidation.validate(req.body, {
            abortEarly: false
        })
        if (checkValidation.error) {
            return res.status(401).send({
                "status": "error",
                message: checkValidation.error.message
            })
        }
        const checkTheater = await theaterModel.findById(theaterId);
        if (!checkTheater) {
            return res.status(401).send({
                "status": "error",
                message: "Theater Not Found"
            })
        }
        const checkTheaterTotalScreen = await theaterScreenModel.find({ theaterId: checkTheater._id });
        if (checkTheater.totalScreens == checkTheaterTotalScreen.length) {
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
    } catch (error) {
        console.log(error)
        return res.status(401).send({
            "status": "error",
            message: "Error In Add Theater Screen",
            error
        })
    }
}

export const getTheaterScreenController = async (req, res) => {
    try {
        const getAllTheaterScreen = await theaterScreenModel.find({});
        if (!getAllTheaterScreen[0]) {
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
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            "status": "error",
            message: "Error in Get All Theater Screen"
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
            return res.status(401).send({
                "status": "error",
                message: checkDetails.error.message
            })
        }
        const theaterScreen = await theaterScreenModel.findById(req.params.id);
        if (!theaterScreen) {
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
    } catch (error) {
        console.log(error)
        return res.status(500).send({
            "status": "error",
            message: "Error in Update theaterScreen Controller"
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
            return res.status(401).send({
                "status": "error",
                message: checkDetails.error.message
            })
        }
        const getTheater = await theaterModel.find({ name: { $regex: new RegExp(theaterName, 'i') } });
        if (!getTheater[0]) {
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

    } catch (error) {
        console.log(error)
        return res.status(500).send({
            "status": "error",
            message: "Errot in get theater screen on the theater controller"
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
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            status:"error",
            message:"INTERNAL ERROR",
            data:null
        })
    }
}