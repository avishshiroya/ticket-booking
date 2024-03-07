import busModel from "../models/busModels.js";
import busSeatModel from "../models/busSeatModel.js";
import busSlotModel from "../models/busSlotModels.js";

export const addBusSeatController = async(req,res)=>{
    try {
        const {slotId,seatOn,seatStart,seatEnd,price} = req.body
        const checkSlotId = await busSlotModel.findById(slotId);
        if(!checkSlotId){
            return res.status(404).json({
                status:"error",
                message:"Bus Slot Not Found",
                data:null
            })
        }
        const checkSeat = seatEnd - seatStart;
        const getBusDetails = await busModel.findById(checkSlotId.busId);
        if(seatEnd > getBusDetails.totalSeats){
            return res.status(400).json({
                status:"error",
                message:"Cannot add seats greater than totalSeats",
                data:null
            })
        }
        const checkTotalNoSeats = await busSeatModel.find({slotId});
        if(checkTotalNoSeats.length == getBusDetails.totalSeats){
            return res.status(400).json({
                status:"error",
                message:"You Allready added total No. of seats",
                data:null
            })
        }
      
        for(let i=seatStart;i<=seatEnd;i++){
            const addSeat = await busSeatModel({
                slotId,seatOn,seatNo:i,price
            })
            await addSeat.save();
        }
        res.status(200).json({
            status:"success",
            message:"Add Seat " + seatStart + " to "+seatEnd,
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

export const updateBusSeatController = async(req,res)=>{
    try {
        const {seatOn,seatNo,price,isBooked,inMaintainance} = req.body
        const checkSeat = await busSeatModel.findById(req.params.id);
        if(!checkSeat){
            return res.status(404).json({
                status:"error",
                message:"Seat Not Found",
                data:null
            })
        }
        const checkSeatNo = await busSeatModel.findOne({slotId:checkSeat.slotId,seatNo});
        if(checkSeatNo){
            return res.status(400).json({
                status:"error",
                message:"Seat Allready added ",
                data:null
            })
        }
        if(seatOn) checkSeat.seatOn = seatOn
        if(seatNo) checkSeat.seatNo = seatNo
        if(price) checkSeat.price = price
        if(isBooked) checkSeat.isBooked = isBooked
        if(inMaintainance) checkSeat.inMaintainance = inMaintainance
        //update seat
        await checkSeat.save();
        res.status(200).json({
            status:"success",
            message:"Seat Updated Successfully",
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

export const getBusSeatController = async (req,res)=>{
    try {
       const checkSlotId = await busSlotModel.findById(req.params.id) ;
       if(!checkSlotId){
        return res.status(404).json({
            status:"error",
            message:"Bus slot Not Found",
            data:null
        })
       }
       const getSeats = await busSeatModel.find({slotId:req.params.id});
       if(!getSeats[0]){
        return res.status(404).json({
            status:"error",
            message:"Bus Seats Not Found",
            data:null
        })
       }
       res.status(200).send({
        status:"error",
        message:'Bus Seats',
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

export const deleteBusSeatContoller = async (req,res)=>{
    try {
        const checkSeat = await busSeatModel.findById(req.params.id);
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
            status:'success',
            message:"Seat deleted successfully",
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