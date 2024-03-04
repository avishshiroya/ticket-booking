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
                success: false,
                message: checkDetails.error.message
            })
        }
        const checkTheater = await theaterModel.findById(theaterId);
        if (!checkTheater) {
            return res.status(401).send({
                success: false,
                message: "Theater not Found"
            })
        }
        const checkMovie = await movieModel.findById(movieId);
        if (!checkMovie) {
            return res.status(401).send({
                success: false,
                message: "Movie not Found"
            })
        }
        const checkScreen = await theaterScreenModel.findById(screenId);
        if (!checkScreen) {
            return res.status(401).send({
                success: false,
                message: "Screen not Found"
            })
        }
        const checkMovieSlot = await movieSlotModel.find({ theaterId, screenId, showTime, showDate });
        if (checkMovieSlot[0]) {
            return res.status(401).send({
                success: false,
                message: "Slot already added"
            })
        }
        const movieSlot = new movieSlotModel({
            theaterId, screenId, movieId, showTime, showDate, description
        })
        //save movie slot
        await movieSlot.save();
        res.status(200).send({
            success: true,
            message: "Movie Slot added Successfully",
            movieSlot
        })
    } catch (error) {
        console.log(error)
        return res.status(401).send({
            success: false,
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
                success: false,
                message: checkDetails.error.message
            })
        }
        const checkMovieSlot = await movieSlotModel.findById(req.params.id);
        if(!checkMovieSlot){
            return res.status(401).send({
                success:false,
                message:"MovieSlot Not Found"
            })
        }
        if (theaterId) {
            const checkTheater = await theaterModel.findById(theaterId);
            if (!checkTheater) {
                return res.status(401).send({
                    success: false,
                    message: "Theater not Found"
                })
            }
        }
        if (movieId) {

            const checkMovie = await movieModel.findById(movieId);
            if (!checkMovie) {
                return res.status(401).send({
                    success: false,
                    message: "Movie not Found"
                })
            }
        }
        if (screenId) {

            const checkScreen = await theaterScreenModel.findById(screenId);
            if (!checkScreen) {
                return res.status(401).send({
                    success: false,
                    message: "Screen not Found"
                })
            }
        }
        if(showTime) checkMovieSlot.showTime = showTime
        if(showDate) checkMovieSlot.showDate = showDate
        if(description) checkMovieSlot.description = description

        //update the movieSlot
       const updateMovieSlot =  await checkMovieSlot.save();
       res.status(200).send({
        success:true,
        message:'Update Movie SLot',
        updateMovieSlot
       })
    } catch (error) {
        console.log(error)
        return res.status(401).send({
            success: false,
            message: "Error in Movie Slot Update API",
            error
        })
    }
}

export const getMovieSlotController = async(req,res)=>{
    try {
        const movieSlots = await movieSlotModel.aggregate([{
            $group:{
                _id:'$showDate',shows:{$push:
                    '$$ROOT'
                }
            }}
        ])
        if(!movieSlots[0]){
            return res.status(200).send({
                success:false,
                message:"Please Add Movie Slot"
            })
        }
        res.status(200).send({
            success:true,
            message:"All Movie Slot",
            movieSlots
        })
    } catch (error) {
        console.log(error)
        return res.status(401).send({
            success:false,
            message:"Error in get Movie Slot API"
        })
    }
}

export const getMovieSlotByTimeController = async (req,res)=>{
    try {
        const {time} = req.body
        if(!time){
            return res.status(401).send({
                success:false,
                message:"Please Provide The time"
            })
        }
        const movieSlot = await movieSlotModel.find({showTime:time});
        if(!movieSlot[0]){
            return res.status(401).send({
                success:false,
                message:"Movie Slot Not Available"
            })
        }
        res.status(200).send({
            success:true,
            message:"Movies Slot Of showTime" + time,
            movieSlot
        })
    } catch (error) {
        console.log(error);
        return res.status(401).send({
            success:false,
            message:"Error in Get Movie Slot By Time controller"
        })
    }
}

export const deleteMovieSlotController = async(req,res)=>{
    try {
        const checkMovieSlot = await movieSlotModel.findById(req.params.id);
        if(!checkMovieSlot){
            return res.status(401).send({
                success:false,
                message:"Movie slot not found"
            })
        }
        //delete movie slot
        const deleteMovieSlot = await checkMovieSlot.deleteOne();
        if(!deleteMovieSlot){
            return res.status(401).send({
                success:false,
                message:"cannot delete movieslot"
            })
        }
        res.status(200).send({
            success:true,
            message:"Movieslot Deleted",
            deleteMovieSlot
        })
    } catch (error) {
        console.log(error)
        return res.status(401).send({
            success:false,
            message:"Error in delete movieslot controller",
            error
        })
    }
}