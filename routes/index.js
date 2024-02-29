import express from "express";
const router = express.Router();
import userRoutes from "./userRoutes.js"
import categoryRoutes from "./categoryRoutes.js"


router.use('/user',userRoutes)
router.use('/category',categoryRoutes)

export default router