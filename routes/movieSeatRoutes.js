import express from "express"
import { adminIsAuth } from "../middleware/authentication.js";
import { addMovieSeatsController, deleteMovieSeatsController, getMovieSeatsController } from "../controllers/movieSeat.controllers.js";
const router = express.Router();

router.post('/',adminIsAuth,addMovieSeatsController)
router.get('/',getMovieSeatsController)
router.get('/seat',adminIsAuth,deleteMovieSeatsController)

export default router