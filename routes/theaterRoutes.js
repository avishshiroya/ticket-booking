import express from "express"
import { adminIsAuth } from "../middleware/authentication.js";
import { addTheaterController, deleteTheaterController, getAllTheaterController, getTheaterByNameController, updateTheaterController } from "../controllers/theater.controllers.js";
const router = express.Router();

router.post("/",adminIsAuth,addTheaterController)
router.get("/",adminIsAuth,getAllTheaterController)
router.get("/name",adminIsAuth,getTheaterByNameController)
router.put("/:id",adminIsAuth,updateTheaterController)
router.delete("/:id",adminIsAuth,deleteTheaterController)

export default router