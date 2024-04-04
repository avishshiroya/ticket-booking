import trainModel from "../models/trainModels.js";
import trainSeatModel from "../models/trainSeatModels.js";
import trainSlotModel from "../models/trainSlotModels.js";
import logger from "../utils/logger.js";
import successResponse from "../middleware/successResponse.js"
import errorResponse from "../middleware/errorResponse.js"
import { addTrainSeatValidation } from "../validation/trainSeat.validation.js";
import mongoose from "mongoose";
export const addTrainSeatController = async(req,res)=>{
     const session = await mongoose.startSession();
    session.startTransaction();
    try {
        const {seatClass,seatStart,seatEnd,price,slotId} = req.body
        const checkDetails = addTrainSeatValidation.validate(req.body,{
            abortEarly:false
        })
        if(checkDetails.error){
            logger.error(checkDetails.error.message +" addtrainseat")
            return res.status(400).json({
                status:"error",
                message:checkDetails.error.message,
                data:null
            })
        }
        const checkTrainSlot = await trainSlotModel.findById(slotId);
        if(!checkTrainSlot){
            logger.error("Train slot not found  addtrainseat")
            return res.status(404).json({
                status:"error",
                message:"Train Slot Not Found ",
                data:null
            })
        }
        const checkClass = await trainModel.findOne({_id:checkTrainSlot.trainId,classes:{$in:[seatClass]}})
        if(!checkClass){
            logger.error("train not found given class   addtrainseat")
            return res.status(404).json({
                status:"error",
                message:"Train Not Found Which have Class " + seatClass,
                data:null
            })
        }

        for(let i=seatStart;i<=seatEnd;i++){
            const addSeat = new trainSeatModel({
                slotId,
                class:seatClass,
                seatNo:i,
                price
            })
            await addSeat.save({session});
        }

        res.send(200).send({
            status:"success",
            message:"Train seat added",
            data:null
        })
        await session.commitTransaction();      
        logger.info("Train seat added successfully")
    } catch (error) {
        await session.abortTransaction();
        console.log(error);
        logger.error("errror in trainseatadd")
        return res.status(500).json({
            status:"error",
            message:"internal Error",
            data:null
        })
    }finally{
        session.endSession();
    }
 }

 export const updateTrainSeatController = async(req,res)=>{
    try {
        const {seatClass,seatNo,price} = req.body
        const checkSeat = await trainSeatModel.findById(req.params.id).populate("slotId");
        if(!checkSeat){
            logger.error("seat not found  updatetrainseat")
            return res.status(404).json({
                status:"error",
                message:"Seat Not Found",
                data:null
            })
        }
        const checkClass = await trainModel.findOne({_id:checkSeat.slotId.trainId,classes:seatClass})
        if(!checkClass){
            logger.error("seat class not found   updatetrainseat")
            return res.status(404).json({
                status:"error",
                message:"Seat Class Not Found",
                data:null
            })
        }
        if(seatClass) checkSeat.class = seatClass
        if(price) checkSeat.price = price
        if(seatNo) checkSeat.seatNo = seatNo
        //update seat
        await checkSeat.save();
        res.status(200).json({
            status:"success",
            message:"Seat updated successfully ",
            data:null
        })
        logger.info("update trainseat")
    } catch (error) {
        console.log(error);
        logger.error("Error in train Seat update")
        return res.status(500).json({
            status:"error",
            message:"Internal Error",
            data:null
        })
    }
 }
 export const getTrainSeatBySlotIdController = async (req,res)=>{
    try {
        const checkTrainSlot = await trainSlotModel.findById(req.params.id);
        if(!checkTrainSlot){
            logger.error("train slot not found  gettrainseatbyslotid")
            return res.status(404).json({
                status:"error",
                message:"TrainSlot Not Found",
                data:null
            })
        }
        const getSeats = await trainSeatModel.find({slotId:req.params.id});
        if(!getSeats[0]){
            logger.error("seats not found   gettrainseatbyslotid")
            // return res.status(404).json({
            //     status:"error",
            //     message:"Seats Not Found",
            //     data:null
            // })
            errorResponse(res,{statusCode:404,message:"Seats Not Found"})
        }
        // res.status(200).json({
        //     status:"success",
        //     message:"train seats",
        //     data:getSeats
        // })
        successResponse(res,{statusCode:200,data:getSeats,message:"trainSeats",header:{"X-name":"avish shiroya","X-newOne":"abc"}})
        logger.info("Get train seat by slot")
    } catch (error) {
        console.log(error);
        logger.error("Error in getTrainseatbyslot")
        // return res.status(500).json({
        //     status:"error",
        //     message:"Internal Error",
        //     data:null
        // })
        errorResponse(res,{statusCode:500,message:"Internal Server Error"})
    }
 }

 export const deleteTrainSeatController = async (req,res)=>{
    try {
        const checkSeat = await trainSeatModel.findById(req.params.id);
        if(!checkSeat){
            logger.error("seat not found  deletetrainseat")
            return res.status(404).json({
                status:"error",
                message:"Seat Not Found",
                data:null
            })
        }
        //delete seat
        await checkSeat.deleteOne();
        res.status(200).json({
            status:"success",
            message:"Seat Deleted Successfully",
            data:null
        })
        logger.info("delete train seat")
    } catch (error) {
        console.log(error)
        logger.error("Error in deletetrainseat")
        return res.status(500).json({
            status:"error",
            message:"Internal Error",
            data:null
        })
    }
 }