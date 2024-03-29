import express from "express"
import { adminLogoutController, getAdminDetails, loginAdminController, registerAdminController } from "../controllers/admin.controllers.js";
import { adminIsAuth } from "../middleware/authentication.js";
const router = express.Router();

router.post('/register',registerAdminController)
router.post('/login',loginAdminController)
router.get('/',adminIsAuth,getAdminDetails )
router.get("/logout",adminIsAuth, adminLogoutController)


export default router