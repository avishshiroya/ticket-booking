import seatbookingModel from "../models/busSeatBookingModels.js"
import busSeatModel from "../models/busSeatModel.js"
import promoCodeModel from "../models/promoCode.js"
import axios from "axios"
export const busTrainSeatBookingController = async(req,res)=>{
    try {
        const {busSeats,promocode,passanger} = req.body
        if(!req.user._id){
            return res.status(401).json({
                status:"error",
                message:"User UnAuathenticated",
                data:null
            })
        }
        if(!busSeats[0]){
            return res.status(404).json({
                status:"error",
                message:"Pls ! Select Seats",
                data:null
            }) 
        }
        console.log(busSeats.length,passanger.length)
        if(busSeats.length != passanger.length){
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
                return res.status(404).json({
                    status:"error",
                    message:"Selected Seats In Maintainance",
                    data:null
                })
            }
            console.log(checkSeats)
            if(!passanger[i].name || !passanger[i].age || !passanger[i].gender){
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