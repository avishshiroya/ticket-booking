import express from "express"
import { addCategoryController, categoryDeleteController, categorySortTypeController, getAllCategoryController, updateCategoryController } from "../controllers/category.controllers.js";
const router = express.Router();

router.post("/add",addCategoryController)
router.get("/get-all",getAllCategoryController)
router.put('/:id',updateCategoryController)
router.get('/type/:sort',categorySortTypeController)
router.delete('/:id',categoryDeleteController)


export default router