import express from "express";
const router = express.Router();
import userRoutes from "./userRoutes.js"
import categoryRoutes from "./categoryRoutes.js"
import adminRoutes from "./adminRoutes.js"


router.use('/user',userRoutes)
router.use('/category',categoryRoutes)
router.use('/admin',adminRoutes)

export default router