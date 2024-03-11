import express from "express"
import { adminIsAuth } from "../middleware/authentication.js";
import {addMovieSlotController, deleteMovieSlotController, getMovieSlotByTimeController, getMovieSlotBynameController, getMovieSlotController, updateMovieSlotController } from "../controllers/movieSlot.controllers.js";
const router = express.Router();

router.post("/",adminIsAuth,addMovieSlotController)
router.put("/:id",adminIsAuth,updateMovieSlotController)
router.get("/",getMovieSlotController)
router.get("/time",adminIsAuth,getMovieSlotByTimeController)
router.get("/get",adminIsAuth,getMovieSlotByTimeController)
router.delete("/:id",adminIsAuth,deleteMovieSlotController)
router.get("/name",getMovieSlotBynameController)

export default router