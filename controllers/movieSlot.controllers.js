import movieSlotModel from "../models/movieSlotModels.js"
import movieModel from "../models/moviesModel.js"
import theaterScreenModel from "../models/theaterScreen.js"
import theaterModel from "../models/theatersModel.js"
import logger from "../utils/logger.js"
import { addMovieSlotValidation, updateMovieSlotValidation } from "../validation/movieSlot.validation.js"

export const addMovieSlotController = async (req, res) => {
    try {
        const { theaterId, screenId, movieId, showTime, showDate, description } = req.body
        const checkDetails = addMovieSlotValidation.validate(req.body, {
            abortEarly: false
        })
        if (checkDetails.error) {
            logger.error(checkDetails.error.message + " addmovieslot")
            return res.status(400).send({
                "status": "error",
                message: checkDetails.error.message
            })
        }
        const checkTheater = await theaterModel.findById(theaterId);
        if (!checkTheater) {
            logger.error("theater not found  addmovieslot")
            return res.status(400).send({
                "status": "error",
                message: "Theater not Found"
            })
        }
        const checkMovie = await movieModel.findById(movieId);
        if (!checkMovie) {
            logger.error("movie not found  addmovieslot")
            return res.status(400).send({
                "status": "error",
                message: "Movie not Found"
            })
        }
        const checkScreen = await theaterScreenModel.findById(screenId);
        if (!checkScreen) {
            logger.error("screen not found  addmovieslot")
            return res.status(400).send({
                "status": "error",
                message: "Screen not Found"
            })
        }
        const checkMovieSlot = await movieSlotModel.find({ theaterId, screenId, showTime, showDate });
        if (checkMovieSlot[0]) {
            logger.error("Slot already added  addmovieslot")
            return res.status(400).send({
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
            data:movieSlot
        })
        logger.info("movieslot added")
    } catch (error) {
        console.log(error)
        logger.error("Error in add movie slot")
        return res.status(500).send({
            "status": "error",
            message: "Internal Error",
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
            logger.error(checkDetails.error.message + " updatemovieslot")
            return res.status(400).send({
                "status": "error",
                message: checkDetails.error.message
            })
        }
        const checkMovieSlot = await movieSlotModel.findById(req.params.id);
        if (!checkMovieSlot) {
            logger.error(" movieslot not found updatemovieslot")

            return res.status(400).send({
                "status": "error",
                message: "MovieSlot Not Found"
            })
        }
        if (theaterId) {
            const checkTheater = await theaterModel.findById(theaterId);

            if (!checkTheater) {
                logger.error("Theater not found  updatemovieslot")
                return res.status(400).send({
                    "status": "error",
                    message: "Theater not Found"
                })
            }
        }
        if (movieId) {

            const checkMovie = await movieModel.findById(movieId);
            if (!checkMovie) {
                logger.error("movie not found  updatemovieslot")
                return res.status(400).send({
                    "status": "error",
                    message: "Movie not Found"
                })
            }
        }
        if (screenId) {

            const checkScreen = await theaterScreenModel.findById(screenId);
            if (!checkScreen) {
                logger.error("screen not found  updatemovieslot")
                return res.status(400).send({
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
        logger.info("Movie Slot update")
    } catch (error) {
        console.log(error)
        logger.error("Error in Movie Slot Update API")
        return res.status(500).send({
            "status": "error",
            message: "Internal Error",
            
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
            logger.error("movieslot not found  getmovieslot")
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
        logger.info("get all movieslot")
    } catch (error) {
        console.log(error)
        logger.error("Error in get Movie Slot API")
        return res.status(400).send({
            "status": "error",
            message: "Internal Error"
        })
    }
}

export const getMovieSlotByTimeController = async (req, res) => {
    try {
        const { time } = req.body
        if (!time) {
            logger.error("not get time  getmovieslotbytime")
            return res.status(400).send({
                "status": "error",
                message: "Please Provide The time"
            })
        }
        const movieSlot = await movieSlotModel.find({ showTime: time });
        if (!movieSlot[0]) {
            logger.error("Movie slot not found getmovislotbytime")
            return res.status(400).send({
                "status": "error",
                message: "Movie Slot Not Available"
            })
        }
        res.status(200).send({
            "status": "success",
            message: "Movies Slot Of showTime" + time,
            data:movieSlot
        })
    } catch (error) {
        console.log(error);
        logger.error("Error in Get Movie Slot By Time controller")
        return res.status(500).send({
            "status": "error",
            message: "Intrnal Error"
        })
    }
}

export const deleteMovieSlotController = async (req, res) => {
    try {
        const checkMovieSlot = await movieSlotModel.findById(req.params.id);
        if (!checkMovieSlot) {
            logger.error("Movie slot not found  deletemovieslot")
            return res.status(400).send({
                "status": "error",
                message: "Movie slot not found"
            })
        }
        //delete movie slot
        const deleteMovieSlot = await checkMovieSlot.deleteOne();
        if (!deleteMovieSlot) {
            logger.error("Cannot delete movieslot")
            return res.status(400).send({
                "status": "error",
                message: "cannot delete movieslot"
            })
        }
        res.status(200).send({
            "status": "success",
            message: "Movieslot Deleted",
            deleteMovieSlot
        })
        logger.info("movie slot delete")
    } catch (error) {
        console.log(error)
        logger.error("Error in delete movieslot controller")
        return res.status(500).send({
            "status": "error",
            message: "Internal Error ",
            error
        })
    }
}
export const getMovieSlotBynameController = async(req,res)=>{
    try {
        const {movieName} = req.body
        if(!movieName){
            logger.error("cannot get movie name  getmovieslotbyname")
            return res.status(400).json({
                status:"error",
                message:"Movie Name is Required",
                data:null
            })
        }
        const checkMovie = await movieModel.findOne({title:movieName});
        if(!checkMovie){
            logger.error("Not found movie  getmovieslotbyname")
            return res.status(404).json({
                status:"error",
                message:"Movie Come Soon....",
                data:null
            })
        }
        const getSlot = await movieSlotModel.find({movieId:checkMovie._id}).populate("theaterId").populate("screenId").populate("movieId");
        if(!getSlot[0]){
            logger.error("not found movieslot  getmovieslotbyname")
            return res.status(404).json({
                status:"error",
                message:"cannot find movieSlot",
                data:null
            })
        }
        res.status(200).json({
            status:"success",
            message:"slots",
            data:getSlot
        })
        logger.info("Get movieslot by moviename")
    } catch (error) {
        console.log(error);
        logger.error("Error in getmovislotbyname")
        return res.status(500).json({
            status:"error",
            message:"Internal Error",
            data:null
        })
    }
}