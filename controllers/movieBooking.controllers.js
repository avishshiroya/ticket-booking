import axios from "axios";
import movieBookingModel from "../models/movieBooking.js";
import movieSeatModel from "../models/movieSeatModels.js";

export const bookMovieTicketController = async (req, res) => {
    try {
        const { seats } = req.body
        if (!seats[0]) {
            return res.status(401).send({
                success: false,
                message: "Please Provide MovieSeats "
            })
        }
        var totalAmount = 0;
        for (let i = 0; i < seats.length; i++) {
            console.log(seats[i])
            const checkSeats = await movieSeatModel.findOne({ _id: seats[i], isBooked: false });
            if (!checkSeats) {
                return res.status(401).send({
                    success: false,
                    message: "Selected Seats Are Already Booked"
                })
            }
            totalAmount+=checkSeats.price
            const updateSeats = await movieSeatModel.findOneAndUpdate({ _id: seats[i], isBooked: false },{isBooked:true});
            if(!updateSeats){
                return res.status(401).send({
                    success: false,
                    message: "Selected Seats can't Booked"
                })
            }
            console.log(checkSeats,updateSeats)
        }
        const movieBook = new movieBookingModel({
            userId:req.user.id,
            movieSeatsId:seats,
            totalAmount,
            isPaid:true
        })
        //save movieBooking
        await movieBook.save();
        console.log(totalAmount)
        const Payment = await axios.post("http://localhost:4040/api/v1/payment/create-payment",{
            amount:totalAmount,movieBookingId:movieBook._id
        })
        if(!Payment){
            return res.status(401).send({
                success:false,
                message:"Cannot Book Ticket"
            })
        }
        res.status(200).send({
            success: true,
            message: "Total Amount is " + totalAmount,
            movieBook
        })
        console.log(totalAmount)

    } catch (error) {
        console.log(error)
        return res.status(401).send({
            success: false,
            message: "Error In Movie Ticket Booking API"
        })
    }
}