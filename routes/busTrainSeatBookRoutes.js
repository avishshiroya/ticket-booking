import express from "express"
import { isAuth } from "../middleware/authentication.js";
import { busTrainSeatBookingController } from "../controllers/busTrainSeatBook.controllers.js";
const router = express.Router();

router.post("/",isAuth,busTrainSeatBookingController)

export default router