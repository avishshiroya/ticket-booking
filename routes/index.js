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

router.use('/user',userRoutes)
router.use('/admin',adminRoutes)
router.use('/category',categoryRoutes)
router.use('/movie',movieRoutes)
router.use('/route',routeRoutes)
router.use('/theater',theaterRoutes)
router.use('/theaterScreen',theaterScreenRoutes)
router.use('/movieSlot',movieSlotRoutes)
router.use('/movieSeat',movieSeatRoutes)


export default router