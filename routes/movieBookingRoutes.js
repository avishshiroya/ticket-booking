import express from "express"
import { isAuth } from "../middleware/authentication.js"
import { bookMovieTicketController } from "../controllers/movieBooking.controllers.js"
const router = express.Router()

router.post("/",isAuth,bookMovieTicketController)

export default router