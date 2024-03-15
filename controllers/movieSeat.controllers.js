import movieSeatModel from "../models/movieSeatModels.js";
import movieSlotModel from "../models/movieSlotModels.js";
import { addMovieSeatsValidation } from "../validation/movieSeat.validation.js";
import logger from "../utils/logger.js";

export const addMovieSeatsController = async (req, res) => {
    try {
        const { price, row, startNo, endNo, movieSlotId } = req.body
        const checkDetails = addMovieSeatsValidation.validate(req.body, {
            abortEarly: false
        })
        if (checkDetails.error) {
            logger.error(checkDetails.error.message + " addmovieseat")
            return res.status(400).send({
                "status": "error",
                message: checkDetails.error.message
            })
        }
        const checkMovieSlot = await movieSlotModel.findById(movieSlotId);
        if (!checkMovieSlot) {
            logger.error("Movie slot not found  addmovieseat")
            return res.status(400).send({
                "status": "error",
                message: "MovieSlot Not Found"
            })
        }
        for (let i = startNo; i <= endNo; i++) {
            const movieSeats = new movieSeatModel({
                seat: row.toUpperCase() + i,
                movieSlotId, price
            })
            await movieSeats.save();
        }
        res.status(200).send({
            "status": "success",
            message: "Seats Added"
        })
        logger.info("movie Seats Created")
    } catch (error) {
        console.log(error);
        logger.error("Error in add movie seat")
        return res.status(500).send({
            "status": "error",
            message: "Internal Error",
            
        })
    }
}

export const getMovieSeatsController = async (req, res) => {
    try {
        const { movieSlotId } = req.body
        const checkMovieSlot = await movieSlotModel.findOne({ _id: movieSlotId, showDate: { $gte: new Date().getDate() } })
        console.log(checkMovieSlot)
        if (!checkMovieSlot) {
            logger.error("Movie slot not found  getmovieseat")
            return res.status(400).send({
                "status": "error",
                message: "Movie Slot Not Found"
            })
        }
        const movieSeats = await movieSeatModel.find({ movieSlotId, }, { seat: 1, _id: 1, isBooked: 1, price: 1 });
        if (!movieSeats[0]) {
            logger.error("Movie seat not found  getmovieseat")
            return res.status(400).send({
                "status": "error",
                message: "Movie Seats Add In Upcoming Time || Slot Not Have any unReserved Seats"
            })
        }
        res.status(200).send({
            "status": "success",
            message: "Movie Seats",
            movieSeats
        })
        logger.info("Get movie seat")
    } catch (error) {
        console.log(error)
        logger.error("Error in get movieseats")
        return res.status(500).send({
            "status": "error",
            message: "Internal Error"
        })
    }
}

export const deleteMovieSeatsController = async (req, res) => {
    try {
        const { row, movieSlotId } = req.body
        const rowChar = "^" + row.toUpperCase()
        console.log(rowChar);
        const checkSeats = await movieSeatModel.find({ movieSlotId, seat: new RegExp(rowChar, "g") });
        if (!checkSeats[0]) {
            logger.error("no thave movie seat series  deletemovieseat")
            return res.status(400).send({
                "status": "error",
                message: "Cannot Have Seats of series " + row,
                checkSeats
            })
        }
        const deleteSeats = await movieSeatModel.deleteMany({ movieSlotId, seat: new RegExp(rowChar, "g") });
        res.status(200).send({
            "status": "success",
            message: "All Seats delete of series " + row,
            data:null
        })
        logger.info("Delete movie seats ")
    } catch (error) {
        console.log(error)
        logger.error("Error in deletemovieseat")
        res.status(500).send({
            "status": "error",
            message: "Internal Error"
        })
    }
}

export const deleteAllMovieSeatsController = async (req, res) => {
    try {
        const { movieSlotId } = req.body
        const checkMovieSlot = await movieSeatModel.find({ movieSlotId });
        if (!checkMovieSlot[0]) {
            logger.error("Movie seats not found  deleteallmovieseat")
            return res.status(400).send({
                "status": "error",
                message: "MovieSeats Not Found"
            })
        }
        const deleteMovieSeats = await movieSeatModel.deleteMany({ movieSlotId });
        if (!deleteMovieSeats) {
            logger.error("Cannot delete Movie seat")
            return res.status(400).send({
                "status": "error",
                message: "Can't Delete Movie Seats"
            })
        }
        res.status(200).send({
            "status": "success",
            message: "Deleted Movie Sets",
        })
        logger.info("Delete movie seat")
    } catch (error) {
        console.log(error)
        logger.error("Error in delete all movie seat");
        return res.status(500).send({
            "status": "error",
            message: "Internal Error",
        })
    }
}