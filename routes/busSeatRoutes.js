import express from "express"
import { adminIsAuth } from "../middleware/authentication.js";
import { addBusSeatController, deleteBusSeatContoller, getBusSeatController, updateBusSeatController } from "../controllers/busSeat.controllers.js";
const router = express.Router();

router.post('/',adminIsAuth,addBusSeatController)
router.put('/:id',adminIsAuth,updateBusSeatController)
router.get('/:id',getBusSeatController)
router.delete('/:id',adminIsAuth,deleteBusSeatContoller)

export default router