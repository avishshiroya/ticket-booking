import express from "express";
const router = express.Router();
import userRoutes from "./userRoutes.js"
import categoryRoutes from "./categoryRoutes.js"
import adminRoutes from "./adminRoutes.js"
import movieRoutes from "./movieRoutes.js"
import routeRoutes from "./routeRoutes.js"
import theaterRoutes from "./theaterRoutes.js"
import theaterScreenRoutes from './theaterScreenRoutes.js'
import movieSlotRoutes from "./movieSlotRoutes.js"
import movieSeatRoutes from "./movieSeatRoutes.js"
import movieBookingRoutes from "./movieBookingRoutes.js";
import paymentRoutes from "./paymentRoutes.js"
import promoCodeRoutes from "./promoCodeRoutes.js"
import busRoutes from "./busRoutes.js"
import busSlotRoutes from "./busSlotRoutes.js"
import busSeatRoutes from "./busSeatRoutes.js"
import trainSeatRoutes from "./trainSeatRoutes.js"
import trainRoutes from "./trainRoutes.js"
import trainSlotRoutes from "./trainSlotRoutes.js"
import busTrainSeatBookRoutes from "./busTrainSeatBookRoutes.js"

router.use('/user',userRoutes)
router.use('/admin',adminRoutes)
router.use('/category',categoryRoutes)
router.use('/movie',movieRoutes)
router.use('/route',routeRoutes)
router.use('/theater',theaterRoutes)
router.use('/theaterScreen',theaterScreenRoutes)
router.use('/movieSlot',movieSlotRoutes)
router.use('/movieSeat',movieSeatRoutes)
router.use('/movieSeatBooking',movieBookingRoutes)
router.use('/payment',paymentRoutes)
router.use('/promocode',promoCodeRoutes)
router.use('/bus',busRoutes)
router.use('/train',trainRoutes)
router.use('/busSlot',busSlotRoutes)
router.use('/trainSlot',trainSlotRoutes)
router.use('/busSeat',busSeatRoutes)
router.use('/seatBooking',busTrainSeatBookRoutes)
router.use('/trainSeat',trainSeatRoutes)


export default router