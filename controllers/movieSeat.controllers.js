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
                success: false,
                message: checkDetails.error.message
            })
        }
        const checkMovieSlot = await movieSlotModel.findById(movieSlotId);
        if (!checkMovieSlot) {
            return res.status(401).send({
                success: false,
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
            success: true,
            message: "Seats Added"
        })
    } catch (error) {
        console.log(error);
        return res.status(401).send({
            success: false,
            message: "Error In Add Movie Seats Controller",
            error
        })
    }
}

export const getMovieSeatsController = async (req, res) => {
    try {
        const { movieSlotId } = req.body
        const checkMovieSlot = await movieSlotModel.findById(movieSlotId)
        if (!checkMovieSlot) {
            return res.status(401).send({
                success: false,
                message: "Movie Slot Not Found"
            })
        }
        const movieSeats = await movieSeatModel.find({ movieSlotId, isBooked: false }, { seat: 1, _id: 1 });
        if (!movieSeats[0]) {
            return res.status(401).send({
                success: false,
                message: "Movie Seats Add In Upcoming Time || Slot Not Have any unReserved Seats"
            })
        }
        res.status(200).send({
            success: true,
            message: "UnBooked Seats",
            movieSeats
        })
    } catch (error) {
        console.log(error)
        return res.status(401).send({
            success: false,
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
                success: false,
                message: "Cannot Have Seats of series " + row,
                checkSeats
            })
        }
        const deleteSeats = await movieSeatModel.deleteMany({ movieSlotId, seat: new RegExp(rowChar, "g") });
        res.status(200).send({
            success: true,
            message: "All Seats delete of series " + row,
            deleteSeats
        })
    } catch (error) {
        console.log(error)
        res.status(401).send({
            success: false,
            message: "Error in Delete Movies Seats API"
        })
    }
}

export const deleteAllMovieSeatsController = async (req,res)=>{
    try {
        const {movieSlotId} = req.body
        const checkMovieSlot = await movieSeatModel.find({movieSlotId});
        if(!checkMovieSlot[0]){
            return res.status(401).send({
                success:false,
                message:"MovieSeats Not Found"
            })
        }
        const deleteMovieSeats = await movieSeatModel.deleteMany({movieSlotId});
        if(!deleteMovieSeats){
            return res.status(401).send({
                success:false,
                message:"Can't Delete Movie Seats"
            })
        }
        res.status(401).send({
            success:true,
            message:"Deleted Movie Sets",
            deleteMovieSeats
        })
    } catch (error) {
        console.log(error)
        return res.status(401).send({
            success:false,
            message:"Error in Delete All Movie Seats API",
            error
        })
    }
}