import theaterModel from "../models/theatersModel.js";
import { addTheaterValidation, getTheaterByNameValidation } from "../validation/theater.validation.js";

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
        const getTheater = await theaterModel.find({ name });
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