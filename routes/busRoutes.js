import express from "express"
import { adminIsAuth } from "../middleware/authentication.js";
import { addBusContoller, deleteBusController, getAllBusController, getBusOnNameController, getBusOnlicensePlateController, updateBusController } from "../controllers/bus.controllers.js";
const router = express.Router();

router.post("/",adminIsAuth,addBusContoller)
router.put("/:id",adminIsAuth,updateBusController)
router.get("/",getAllBusController)
router.get("/name",getBusOnNameController)
router.get("/uniqueId",getBusOnlicensePlateController)
router.delete("/:id",adminIsAuth,deleteBusController)

export default router