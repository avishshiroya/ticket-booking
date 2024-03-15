import seatbookingModel from "../models/busSeatBookingModels.js"
import busSeatModel from "../models/busSeatModel.js"
import promoCodeModel from "../models/promoCode.js"
import axios from "axios"
import trainSeatModel from "../models/trainSeatModels.js"
import logger from "../utils/logger.js"
export const busSeatBookingController = async(req,res)=>{
    try {
        const {busSeats,promocode,passanger} = req.body
        if(!req.user._id){
            logger.error("User unauthorized busseatbooking")
            return res.status(401).json({
                status:"error",
                message:"User UnAuathenticated",
                data:null
            })
        }
        if(!busSeats[0]){
            logger.error("Bus not selected busseatbooking")
            return res.status(404).json({
                status:"error",
                message:"Pls ! Select Seats",
                data:null
            }) 
        }
        console.log(busSeats.length,passanger.length)
        if(busSeats.length != passanger.length){
            logger.error("not correct passenger details  busseatbooking")
            return res.status(400).json({
                status:"error",
                message:"Please give the correct details of passanger",
                data:null
            })
        }
        var totalAmount = 0;
        var promodiscount = 0;
        var discountedAmount = 0;
        if(promocode){
            const checkPromoCode = await promoCodeModel.findOne({code:promocode});
            console.log(checkPromoCode);
            if(!checkPromoCode){
                logger.error("Promocode Not Found busseatbooking")
                return res.status(404).json({
                    status:"error",
                    message:"PromoCode Not Found",
                    data:null
                })
            }
            promodiscount = checkPromoCode.percentage
        }

        for(let i=0;i<busSeats.length;i++){
            console.log(busSeats[i],i);
            const checkSeats = await busSeatModel.findOne({_id:busSeats[i],isBooked:false,inMaintainance:false});
            console.log(checkSeats);
            if(!checkSeats){
                logger.error("seat Not Found or in maintainance and booked busseatbooking ")
                return res.status(404).json({
                    status:"error",
                    message:"Selected Seats In Maintainance or Booked",
                    data:null
                })
            }
            console.log(checkSeats)
            if(!passanger[i].name || !passanger[i].age || !passanger[i].gender){
                logger.error("Not Have correct detail in the data busseatbooking")
                return res.status(404).json({
                    status:"error",
                    message:"give the correct information for the passenger" +passanger[i].name,
                    data:null
                })
            }
            totalAmount = totalAmount + checkSeats.price
            if(checkSeats.isBooked == false) checkSeats.isBooked = true
            if(passanger[i].name) checkSeats.name = passanger[i].name
            if(passanger[i].age) checkSeats.age = passanger[i].age
            if(passanger[i].gender) checkSeats.gender = passanger[i].gender
            //save seats
            await checkSeats.save();
        }
        discountedAmount = totalAmount * (promodiscount/100);

        const booking = new seatbookingModel({
            userId:req.user._id,
            busSeats,
            promoCode:promocode,
            totalAmount,
            discountedAmount:(totalAmount - discountedAmount),

        })
        const Payment = await axios.post("http://localhost:4040/api/v1/payment/busTrain/create-payment", {
            amount: booking.discountedAmount, bookingId: booking._id
        })
        if (!Payment) {
            logger.error("Error in payment bussseatbooking")
            return res.status(401).send({
                "status": "error",
                message: "Cannot Book Ticket"
            })
        }
        //save booking
        await booking.save();
        res.status(200).json({
            status:"success",
            message:"Seat Booked",
            data:Payment.data
        })
        logger.info("Seat booked as pending status buseatbooking")
    } catch (error) {
        console.log(error)
        logger.error("Error in busseatbooking")
        return res.status(500).json({
            status:"error",
            message:"Internal Error",
            data:null
        })
    }
}

export const TrainSeatBookingController = async(req,res)=>{
    try {
        const {trainSeats,promocode,passanger} = req.body
        if(!req.user._id){
            logger.error("User unauthorized trainseatbooking")
            return res.status(401).json({
                status:"error",
                message:"User UnAuathenticated",
                data:null
            })
        }
        if(!trainSeats[0]){
            logger.error("not Selected seats trainseatbooking")
            return res.status(404).json({
                status:"error",
                message:"Pls ! Select Seats",
                data:null
            }) 
        }
        console.log(trainSeats.length,passanger.length)
        if(trainSeats.length != passanger.length){
            logger.error("not have correct details of passenger trainseatbooking")
            return res.status(400).json({
                status:"error",
                message:"Please give the correct details of passanger",
                data:null
            })
        }
        var totalAmount = 0;
        var promodiscount = 0;
        var discountedAmount = 0;
        if(promocode){
            const checkPromoCode = await promoCodeModel.findOne({code:promocode});
            console.log(checkPromoCode);
            if(!checkPromoCode){
                logger.error("Promocode not found  trainseatbooking")
                return res.status(404).json({
                    status:"error",
                    message:"PromoCode Not Found",
                    data:null
                })
            }
            promodiscount = checkPromoCode.percentage
        }

        for(let i=0;i<trainSeats.length;i++){
            console.log(trainSeats[i],i);
            const checkSeats = await trainSeatModel.findOne({_id:trainSeats[i],isBooked:false,inMaintainance:false});
            console.log(checkSeats);
            if(!checkSeats){
                logger.error("Selected Seats In Maintainance or Booked  trainseatbooking")
                return res.status(404).json({
                    status:"error",
                    message:"Selected Seats In Maintainance or Booked",
                    data:null
                })
            }
            console.log(checkSeats)
            if(!passanger[i].name || !passanger[i].age || !passanger[i].gender){
                logger.error("Not Have correct Information of passenger  trainseatbooking")
                return res.status(404).json({
                    status:"error",
                    message:"give the correct information for the passenger" +passanger[i].name,
                    data:null
                })
            }
            totalAmount = totalAmount + checkSeats.price
            if(checkSeats.isBooked == false) checkSeats.isBooked = true
            if(passanger[i].name) checkSeats.name = passanger[i].name
            if(passanger[i].age) checkSeats.age = passanger[i].age
            if(passanger[i].gender) checkSeats.gender = passanger[i].gender
            //save seats
            await checkSeats.save();
        }
        discountedAmount = totalAmount * (promodiscount/100);

        const booking = new seatbookingModel({
            userId:req.user._id,
            trainSeats,
            promoCode:promocode,
            totalAmount,
            discountedAmount:(totalAmount - discountedAmount),

        })
        const Payment = await axios.post("http://localhost:4040/api/v1/payment/busTrain/create-payment", {
            amount: booking.discountedAmount, bookingId: booking._id
        })
        if (!Payment) {
            logger.error("Error in payment trainseatbooking")
            return res.status(401).send({
                "status": "error",
                message: "Cannot Book Ticket"

            })
        }
        //save booking
        await booking.save();
        res.status(200).json({
            status:"success",
            message:"Seat Booked",
            data:Payment.data
        })
        logger.info("Train Seat booking as pending")
    } catch (error) {
        console.log(error)
        logger.error("Error in trainseatbooking")
        return res.status(500).json({
            status:"error",
            message:"Internal Error",
            data:null
        })
    }
}