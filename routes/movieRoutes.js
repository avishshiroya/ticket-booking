import express from "express"
import { adminIsAuth } from "../middleware/authentication.js";
import { deleteMovieController, movieAddController, movieGetCastController, movieGetController, movieGetGenreController, movieUpdateController } from "../controllers/movie.controllers.js";
const router = express.Router();


router.post("/add",adminIsAuth, movieAddController)
router.put("/:id",adminIsAuth, movieUpdateController)
router.get("/",movieGetController)
router.get('/genre/:type',movieGetGenreController)
router.get('/casts/:name',movieGetCastController)
router.delete('/:id',adminIsAuth,deleteMovieController)


export default router