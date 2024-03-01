import express from "express"
import { adminIsAuth } from "../middleware/authentication.js";
import { addTheaterController, getAllTheaterController, getTheaterByNameController } from "../controllers/theater.controllers.js";
const router = express.Router();

router.post("/",adminIsAuth,addTheaterController)
router.get("/",adminIsAuth,getAllTheaterController)
router.get("/name",adminIsAuth,getTheaterByNameController)

export default router