import express from "express"
import { adminIsAuth } from "../middleware/authentication.js";
import notifications from '../controllers/notification.controllers.js'
const router = express.Router();

const PATH = {
    ADD:'/',
    GET:'/',
    UPDATE:'/:id',
    delete:'/:id'
}
/**
    * @api {POST} /api/v1/notification/
    * @desc Add The latest notification
    * @acceess private

*/
router.post(PATH.ADD,notifications.addNotificationController)


export default router