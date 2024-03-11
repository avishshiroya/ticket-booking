import express from "express"
import { isAuth } from "../middleware/authentication.js";
import { TrainSeatBookingController, busSeatBookingController } from "../controllers/busTrainSeatBook.controllers.js";
const router = express.Router();

router.post("/",isAuth,busSeatBookingController)
router.post("/train",isAuth,TrainSeatBookingController)

export default router