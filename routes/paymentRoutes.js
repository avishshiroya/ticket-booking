import express from "express"
import { isAuth } from "../middleware/authentication.js";
import { busTrainPaymentcancel, busTraincreatePaymentController, busTrainpaymentCheckOut, paymentCancel } from "../controllers/payment.controllers.js";
const router = express.Router();

// router.post('/create-payment',createPaymentController)
router.get('/busTrain/cancel/:id',busTrainPaymentcancel)
router.get('/cancel/:id',paymentCancel)
// router.get('/checkOut/:id',paymentCheckOut)
router.post('/busTrain/create-payment',busTraincreatePaymentController)
router.get('/busTrain/checkOut/:id',busTrainpaymentCheckOut)

// app.post("/orders", async (req, res) => {
//     const order = await paypal.createOrder(req.body.paymentSource);
//     res.json(order);
//   });
//   app.post("/orders/:orderID/capture", async (req, res) => {
//     const { orderID } = req.params;
//     const captureData = await paypal.capturePayment(orderID);
//     res.json(captureData);
//   });
export default router