import axios from "axios";
import movieBookingModel from "../models/movieBooking.js";
import movieSeatModel from "../models/movieSeatModels.js";
import promoCodeModel from "../models/promoCode.js";

export const bookMovieTicketController = async (req, res) => {
    try {
        const { seats, promocode } = req.body
        // console.log(promocode)
        if (!seats[0]) {
            return res.status(401).send({
                "status": "error",
                message: "Please Provide MovieSeats "
            })
        }
        var totalAmount = 0;
        for (let i = 0; i < seats.length; i++) {
            console.log(seats[i])
            const checkSeats = await movieSeatModel.findOne({ _id: seats[i], isBooked: false });
            if (!checkSeats) {
                return res.status(401).send({
                    "status": "error",
                    message: "Selected Seats Are Already Booked"
                })
            }
            totalAmount += checkSeats.price
            const updateSeats = await movieSeatModel.findOneAndUpdate({ _id: seats[i], isBooked: false }, { isBooked: true });
            if (!updateSeats) {
                return res.status(401).send({
                    "status": "error",
                    message: "Selected Seats can't Booked"
                })
            }
            // console.log(checkSeats, updateSeats)
        }
        var promoAmount = 0;
        if (promocode) {
            const checkInUser = await movieBookingModel.findOne({ userId: req.user._id, promoCode: promocode })
            console.log(checkInUser)
            if (checkInUser) {
                return res.status(401).send({
                    status: "error",
                    message: "Promocode One Time Used Already"
                })
            }
            const promoCheck = await promoCodeModel.findOne({ code: promocode });


            promoAmount = totalAmount * (promoCheck.percentage / 100)
            console.log(promoAmount)


        }
        const discountAmount = totalAmount - promoAmount;
        // console.log(discountAmount);
        const movieBook = new movieBookingModel({
            userId: req.user.id,
            movieSeatsId: seats,
            promoCode: promocode,
            totalAmount,
            discountAmount,
            // isPaid:true
        })
        console.log(movieBook);
        //save movieBooking
        await movieBook.save();
        // console.log(totalAmount)
        const Payment = await axios.post("http://localhost:4040/api/v1/payment/create-payment", {
            amount: discountAmount, movieBookingId: movieBook._id
        })
        if (!Payment) {
            return res.status(401).send({
                "status": "error",
                message: "Cannot Book Ticket"
            })
        }
        res.status(200).send({
            "status": "success",
            message: "Total Amount is " + discountAmount > 0 ? discountAmount : totalAmount,
            movieBook
        })
        // console.log(totalAmount)

    } catch (error) {
        console.log(error)
        return res.status(401).send({
            "status": "error",
            message: "Error In Movie Ticket Booking API"
        })
    }
}