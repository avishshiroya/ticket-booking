import express from "express"
import { adminIsAuth } from "../middleware/authentication.js";
import { addTrainSlotController, deleteTrainSlotController, getTrainSlotByRoutesController, updateTrainSlotController } from "../controllers/trainSlot.controllers.js";
const router = express.Router();

router.post("/",adminIsAuth,addTrainSlotController)
router.put("/:id",adminIsAuth,updateTrainSlotController)
router.get("/",getTrainSlotByRoutesController)
router.delete("/:id",adminIsAuth,deleteTrainSlotController)

export default router