import express from "express";
const router = express.Router();
import userRoutes from "./userRoutes.js"
import categoryRoutes from "./categoryRoutes.js"
import adminRoutes from "./adminRoutes.js"
import movieRoutes from "./movieRoutes.js"
import routeRoutes from "./routeRoutes.js"

router.use('/user',userRoutes)
router.use('/admin',adminRoutes)
router.use('/category',categoryRoutes)
router.use('/movie',movieRoutes)
router.use('/route',routeRoutes)


export default router