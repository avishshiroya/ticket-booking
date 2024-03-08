import express from "express"
import { adminIsAuth } from "../middleware/authentication.js";
import { addTrainSlotController, updateTrainSlotController } from "../controllers/trainSlot.controllers.js";
const router = express.Router();

router.post("/",adminIsAuth,addTrainSlotController)
router.put("/:id",adminIsAuth,updateTrainSlotController)

export default router