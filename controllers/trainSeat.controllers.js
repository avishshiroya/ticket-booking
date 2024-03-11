import trainModel from "../models/trainModels.js";
import trainSeatModel from "../models/trainSeatModels.js";
import trainSlotModel from "../models/trainSlotModels.js";
import { addTrainSeatValidation } from "../validation/trainSeat.validation.js";

 export const addTrainSeatController = async(req,res)=>{
    try {
        const {seatClass,seatStart,seatEnd,price,slotId} = req.body
        const checkDeatils = addTrainSeatValidation.validate(req.body,{
            abortEarly:false
        })
        if(checkDeatils.error){
            return res.status(400).json({
                status:"error",
                message:checkDeatils.error.message,
                data:null
            })
        }
        const checkTrainSlot = await trainSlotModel.findById(slotId);
        if(!checkTrainSlot){
            return res.status(404).json({
                status:"error",
                message:"Train Slot Not Found ",
                data:null
            })
        }
        const checkClass = await trainModel.findOne({_id:checkTrainSlot.trainId,classes:{$in:[seatClass]}})
        if(!checkClass){
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
            await addSeat.save();
        }

        return res.status(200).send({
            status:"success",
            message:"Train seat added",
            data:null
        })
        

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            status:"error",
            message:"internal Error",
            data:null
        })
    }
 }

 export const updateTrainSeatController = async(req,res)=>{
    try {
        const {seatClass,seatNo,price} = req.body
        const checkSeat = await trainSeatModel.findById(req.params.id).populate("slotId");
        if(!checkSeat){
            return res.status(404).json({
                status:"error",
                message:"Seat Not Found",
                data:null
            })
        }
        const checkClass = await trainModel.findOne({_id:checkSeat.slotId.trainId,classes:seatClass})
        if(!checkClass){
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
    } catch (error) {
        console.log(error);
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
            return res.status(404).json({
                status:"error",
                message:"TrainSlot Not Found",
                data:null
            })
        }
        const getSeats = await trainSeatModel.find({slotId:req.params.id});
        if(!getSeats[0]){
            return res.status(404).json({
                status:"error",
                message:"Seats Not Found",
                data:null
            })
        }
        res.status(200).json({
            status:"success",
            message:"train seats",
            data:getSeats
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            status:"error",
            message:"Internal Error",
            data:null
        })
    }
 }

 export const deleteTrainSeatController = async (req,res)=>{
    try {
        const checkSeat = await trainSeatModel.findById(req.params.id);
        if(!checkSeat){
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
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            status:"error",
            message:"Internal Error",
            data:null
        })
    }
 }