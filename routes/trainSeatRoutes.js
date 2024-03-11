import express from "express";
import { adminIsAuth } from "../middleware/authentication.js";
import { addTrainSeatController, deleteTrainSeatController, getTrainSeatBySlotIdController, updateTrainSeatController } from "../controllers/trainSeat.controllers.js";
const router = express.Router();

router.post("/",adminIsAuth,addTrainSeatController)
router.put("/:id",adminIsAuth,updateTrainSeatController)
router.get("/slot/:id",getTrainSeatBySlotIdController)
router.delete("/:id",adminIsAuth,deleteTrainSeatController)

export default router;