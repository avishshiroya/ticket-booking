import express from "express"
import { adminIsAuth } from "../middleware/authentication.js";
import { addTrainController, getAllTrainController, updateTrainController ,getTrainBylicensePlateController, deleteTrainController} from "../controllers/train.controllers.js";
const router = express.Router();

router.post("/",adminIsAuth,addTrainController)
router.put("/:id",adminIsAuth,updateTrainController)
router.get("/",adminIsAuth,getAllTrainController)
router.get("/uniqueId",adminIsAuth,getTrainBylicensePlateController)
router.delete("/:id",adminIsAuth,deleteTrainController)

export default router