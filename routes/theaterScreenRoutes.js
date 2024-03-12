import express from "express"
import { adminIsAuth } from "../middleware/authentication.js";
import { addTheaterScreenControlller, deleteTheaterScreenController, getTheaterScreenController, theaterScreenOnTheaterController, updateTheaterScreenController } from "../controllers/theaterScreen.conrollers.js";
const router = express.Router();

router.post('/',adminIsAuth,addTheaterScreenControlller)
router.get('/',adminIsAuth,getTheaterScreenController)
router.put('/:id',adminIsAuth,updateTheaterScreenController)
router.get('/theater',adminIsAuth,theaterScreenOnTheaterController)
router.delete('/:id',adminIsAuth,deleteTheaterScreenController)

export default router