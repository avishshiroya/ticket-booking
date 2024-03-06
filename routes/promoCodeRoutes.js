import express from "express"
import { adminIsAuth } from "../middleware/authentication.js";
import { AddPromoCodeController, deletePromoCodeController, getPromoCodesController, updatePromoCodeController } from "../controllers/promoCode.controllers.js";
const router = express.Router();

router.post("/",adminIsAuth,AddPromoCodeController)
router.get("/",getPromoCodesController)
router.put("/:id",adminIsAuth,updatePromoCodeController)
router.delete("/:id",adminIsAuth,deletePromoCodeController)

export default router