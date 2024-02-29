import express from "express"
import { deleteUserController, getDetailUserController, registerUserController, sendMailTOLoginController, userDetailUpdateController, userLoginController, userLogoutController } from "../controllers/user.contollers.js";
import { isAuth } from "../middleware/authentication.js";
const router = express.Router();

router.post("/register",registerUserController)
router.get("/sendMailTOLogin",sendMailTOLoginController)
router.post("/login",userLoginController)
router.get("/detail",isAuth, getDetailUserController)
router.put("/update-detail",isAuth,userDetailUpdateController )
router.get("/logout",isAuth,userLogoutController )
router.delete("/delete-user",isAuth,deleteUserController)

export default router;