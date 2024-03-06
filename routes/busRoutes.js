import express from "express"
import { adminIsAuth } from "../middleware/authentication.js";
const router = express.Router();

router.post("/",adminIsAuth,)

export default router