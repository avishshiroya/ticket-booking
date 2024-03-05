import express from "express"
import { adminIsAuth } from "../middleware/authentication.js";
import { addMovieSeatsController, deleteAllMovieSeatsController, deleteMovieSeatsController, getMovieSeatsController } from "../controllers/movieSeat.controllers.js";
const router = express.Router();

router.post('/',adminIsAuth,addMovieSeatsController)
router.get('/',getMovieSeatsController)
router.delete('/seat',adminIsAuth,deleteMovieSeatsController)
router.delete('/',adminIsAuth,deleteAllMovieSeatsController)

export default router