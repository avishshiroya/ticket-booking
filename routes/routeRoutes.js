import express from "express"
import { adminIsAuth } from "../middleware/authentication.js";
import { addRoutesController, deleteRoutesController, getRoutesController, searchRoutesByCategoryController, searchRoutesByFromController, searchRoutesByToController, updateRoutesController } from "../controllers/route.controller.js";
const router = express.Router();

router.post("/",adminIsAuth,addRoutesController)
router.get("/",adminIsAuth,getRoutesController)
router.put("/:id",adminIsAuth,updateRoutesController)
router.get("/search/category",adminIsAuth,searchRoutesByCategoryController)
router.get("/search/from",adminIsAuth,searchRoutesByFromController)
router.get("/search/to",adminIsAuth,searchRoutesByToController)
router.delete("/:id",adminIsAuth,deleteRoutesController)


export default router