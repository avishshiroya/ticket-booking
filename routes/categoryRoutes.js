import express from "express"
import { addCategoryController, categoryDeleteController, categorySortTypeController, getAllCategoryController, updateCategoryController } from "../controllers/category.controllers.js";
import { adminIsAuth } from "../middleware/authentication.js";
const router = express.Router();

router.post("/add", adminIsAuth, addCategoryController)
router.put('/:id', adminIsAuth, updateCategoryController)
router.delete('/:id', adminIsAuth, categoryDeleteController)

router.get("/get-all", getAllCategoryController)
router.get('/type/:sort', categorySortTypeController)


export default router