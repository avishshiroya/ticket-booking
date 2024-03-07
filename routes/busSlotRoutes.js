import express from "express";
import { adminIsAuth } from "../middleware/authentication.js";
import { busSlotAddController, deleteBusSlotController, getBusSlotController, getBusSlotOnRoutesController, updateBusSlotController } from "../controllers/busSlot.controllers.js";
const router = express.Router();

router.post('/',adminIsAuth,busSlotAddController)
router.get('/',getBusSlotController)
router.put('/:id',adminIsAuth,updateBusSlotController)
router.delete('/:id',adminIsAuth,deleteBusSlotController)
router.get('/route',getBusSlotOnRoutesController)

export default router