import movieSeatModel from "../models/movieSeatModels.js";
import movieSlotModel from "../models/movieSlotModels.js";
import { addMovieSeatsValidation } from "../validation/movieSeat.validation.js";

export const addMovieSeatsController = async (req, res) => {
    try {
        const { price, row, startNo, endNo, movieSlotId } = req.body
        const checkDetails = addMovieSeatsValidation.validate(req.body, {
            abortEarly: false
        })
        if (checkDetails.error) {
            return res.status(401).send({
                "status": "error",
                message: checkDetails.error.message
            })
        }
        const checkMovieSlot = await movieSlotModel.findById(movieSlotId);
        if (!checkMovieSlot) {
            return res.status(401).send({
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
    } catch (error) {
        console.log(error);
        return res.status(401).send({
            "status": "error",
            message: "Error In Add Movie Seats Controller",
            error
        })
    }
}

export const getMovieSeatsController = async (req, res) => {
    try {
        const { movieSlotId } = req.body
        const checkMovieSlot = await movieSlotModel.findOne({ _id: movieSlotId, showDate: { $gte: new Date().getDate() } })
        console.log(checkMovieSlot)
        if (!checkMovieSlot) {
            return res.status(401).send({
                "status": "error",
                message: "Movie Slot Not Found"
            })
        }
        const movieSeats = await movieSeatModel.find({ movieSlotId, }, { seat: 1, _id: 1, isBooked: 1, price: 1 });
        if (!movieSeats[0]) {
            return res.status(401).send({
                "status": "error",
                message: "Movie Seats Add In Upcoming Time || Slot Not Have any unReserved Seats"
            })
        }
        res.status(200).send({
            "status": "success",
            message: "Movie Seats",
            movieSeats
        })
    } catch (error) {
        console.log(error)
        return res.status(401).send({
            "status": "error",
            message: "Error in get All Movies Seats By Slot API"
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
            return res.status(401).send({
                "status": "error",
                message: "Cannot Have Seats of series " + row,
                checkSeats
            })
        }
        const deleteSeats = await movieSeatModel.deleteMany({ movieSlotId, seat: new RegExp(rowChar, "g") });
        res.status(200).send({
            "status": "success",
            message: "All Seats delete of series " + row,
            deleteSeats
        })
    } catch (error) {
        console.log(error)
        res.status(401).send({
            "status": "error",
            message: "Error in Delete Movies Seats API"
        })
    }
}

export const deleteAllMovieSeatsController = async (req, res) => {
    try {
        const { movieSlotId } = req.body
        const checkMovieSlot = await movieSeatModel.find({ movieSlotId });
        if (!checkMovieSlot[0]) {
            return res.status(401).send({
                "status": "error",
                message: "MovieSeats Not Found"
            })
        }
        const deleteMovieSeats = await movieSeatModel.deleteMany({ movieSlotId });
        if (!deleteMovieSeats) {
            return res.status(401).send({
                "status": "error",
                message: "Can't Delete Movie Seats"
            })
        }
        res.status(401).send({
            "status": "success",
            message: "Deleted Movie Sets",
            deleteMovieSeats
        })
    } catch (error) {
        console.log(error)
        return res.status(401).send({
            "status": "error",
            message: "Error in Delete All Movie Seats API",
            error
        })
    }
}