import movieSlotModel from "../models/movieSlotModels.js"
import movieModel from "../models/moviesModel.js"
import theaterScreenModel from "../models/theaterScreen.js"
import theaterModel from "../models/theatersModel.js"
import { addMovieSlotValidation, updateMovieSlotValidation } from "../validation/movieSlot.validation.js"

export const addMovieSlotController = async (req, res) => {
    try {
        const { theaterId, screenId, movieId, showTime, showDate, description } = req.body
        const checkDetails = addMovieSlotValidation.validate(req.body, {
            abortEarly: false
        })
        if (checkDetails.error) {
            return res.status(401).send({
                "status": "error",
                message: checkDetails.error.message
            })
        }
        const checkTheater = await theaterModel.findById(theaterId);
        if (!checkTheater) {
            return res.status(401).send({
                "status": "error",
                message: "Theater not Found"
            })
        }
        const checkMovie = await movieModel.findById(movieId);
        if (!checkMovie) {
            return res.status(401).send({
                "status": "error",
                message: "Movie not Found"
            })
        }
        const checkScreen = await theaterScreenModel.findById(screenId);
        if (!checkScreen) {
            return res.status(401).send({
                "status": "error",
                message: "Screen not Found"
            })
        }
        const checkMovieSlot = await movieSlotModel.find({ theaterId, screenId, showTime, showDate });
        if (checkMovieSlot[0]) {
            return res.status(401).send({
                "status": "error",
                message: "Slot already added"
            })
        }
        const movieSlot = new movieSlotModel({
            theaterId, screenId, movieId, showTime, showDate, description
        })
        //save movie slot
        await movieSlot.save();
        res.status(200).send({
            "status": "success",
            message: "Movie Slot added Successfully",
            movieSlot
        })
    } catch (error) {
        console.log(error)
        return res.status(401).send({
            "status": "error",
            message: "Error in Add Movie Slot API",
            error
        })
    }
}

export const updateMovieSlotController = async (req, res) => {
    try {
        const { theaterId, screenId, movieId, showTime, showDate, description } = req.body
        const checkDetails = updateMovieSlotValidation.validate(req.body, {
            abortEarly: false
        })
        if (checkDetails.error) {
            return res.status(401).send({
                "status": "error",
                message: checkDetails.error.message
            })
        }
        const checkMovieSlot = await movieSlotModel.findById(req.params.id);
        if (!checkMovieSlot) {
            return res.status(401).send({
                "status": "error",
                message: "MovieSlot Not Found"
            })
        }
        if (theaterId) {
            const checkTheater = await theaterModel.findById(theaterId);
            if (!checkTheater) {
                return res.status(401).send({
                    "status": "error",
                    message: "Theater not Found"
                })
            }
        }
        if (movieId) {

            const checkMovie = await movieModel.findById(movieId);
            if (!checkMovie) {
                return res.status(401).send({
                    "status": "error",
                    message: "Movie not Found"
                })
            }
        }
        if (screenId) {

            const checkScreen = await theaterScreenModel.findById(screenId);
            if (!checkScreen) {
                return res.status(401).send({
                    "status": "error",
                    message: "Screen not Found"
                })
            }
        }
        if (showTime) checkMovieSlot.showTime = showTime
        if (showDate) checkMovieSlot.showDate = showDate
        if (description) checkMovieSlot.description = description

        //update the movieSlot
        const updateMovieSlot = await checkMovieSlot.save();
        res.status(200).send({
            "status": "success",
            message: 'Update Movie SLot',
            updateMovieSlot
        })
    } catch (error) {
        console.log(error)
        return res.status(401).send({
            "status": "error",
            message: "Error in Movie Slot Update API",
            error
        })
    }
}

export const getMovieSlotController = async (req, res) => {
    try {
        const movieSlots = await movieSlotModel.aggregate([{
            $group: {
                _id: '$showDate', shows: {
                    $push:
                        '$$ROOT'
                }
            }
        }
        ])
        if (!movieSlots[0]) {
            return res.status(200).send({
                "status": "error",
                message: "Please Add Movie Slot"
            })
        }
        res.status(200).send({
            "status": "success",
            message: "All Movie Slot",
            movieSlots
        })
    } catch (error) {
        console.log(error)
        return res.status(401).send({
            "status": "error",
            message: "Error in get Movie Slot API"
        })
    }
}

export const getMovieSlotByTimeController = async (req, res) => {
    try {
        const { time } = req.body
        if (!time) {
            return res.status(401).send({
                "status": "error",
                message: "Please Provide The time"
            })
        }
        const movieSlot = await movieSlotModel.find({ showTime: time });
        if (!movieSlot[0]) {
            return res.status(401).send({
                "status": "error",
                message: "Movie Slot Not Available"
            })
        }
        res.status(200).send({
            "status": "success",
            message: "Movies Slot Of showTime" + time,
            movieSlot
        })
    } catch (error) {
        console.log(error);
        return res.status(401).send({
            "status": "error",
            message: "Error in Get Movie Slot By Time controller"
        })
    }
}

export const deleteMovieSlotController = async (req, res) => {
    try {
        const checkMovieSlot = await movieSlotModel.findById(req.params.id);
        if (!checkMovieSlot) {
            return res.status(401).send({
                "status": "error",
                message: "Movie slot not found"
            })
        }
        //delete movie slot
        const deleteMovieSlot = await checkMovieSlot.deleteOne();
        if (!deleteMovieSlot) {
            return res.status(401).send({
                "status": "error",
                message: "cannot delete movieslot"
            })
        }
        res.status(200).send({
            "status": "success",
            message: "Movieslot Deleted",
            deleteMovieSlot
        })
    } catch (error) {
        console.log(error)
        return res.status(401).send({
            "status": "error",
            message: "Error in delete movieslot controller",
            error
        })
    }
}