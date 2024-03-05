import paypal from "paypal-rest-sdk"
import { createPay } from "../middleware/paymentHelper.js"
import axios from "axios"
import movieBookingModel from "../models/movieBooking.js"
export const paymentSuccess = async (req, res) => {
    try {
        res.status(200).send({
            success: true,
            message: "payment Successfull"
        })
    } catch (error) {
        console.log(error)
        return res.status(401).send({
            success: false,
            message: "Error In Payment success API"
        })
    }
}
export const paymentCancel = async (req, res) => {
    try {
        res.status(200).send({
            success: true,
            message: "payment Cancel"
        })
    } catch (error) {
        console.log(error)
        return res.status(401).send({
            success: false,
            message: "Error In Payment cancel API"
        })
    }
}


export const createPaymentController = async (req, res) => {
    const order = {
        "intent": "CAPTURE",
        "purchase_units": [
            {
                // "reference_id": "d9f80740-38f0-11e8-b467-0ed5f89f718b",
                "amount": {
                    "currency_code": "USD",
                    "value": req.body.amount
                },
                // "payee": {
                //     "email": "sb-e8dn4729771589@personal.example.com",
                //     "merchant_id": "HFYFWNPRGBDCS"
                // }

            }
        ],
        "payment_source": {
            "paypal": {
                "experience_context": {
                    "payment_method_preference": "IMMEDIATE_PAYMENT_REQUIRED",
                    // "brand_name": "BOOK INC",
                    "locale": "en-US",
                    // "shipping_preference": "SET_PROVIDED_ADDRESS",
                    "user_action": "PAY_NOW",
                    "return_url": `http://localhost:4040/api/v1/payment/checkOut/${req.body.movieBookingId}`,
                    "cancel_url": "http://localhost:4040/api/v1/payment/success"
                }
            }
        }

    }
    const clientId = process.env.PAYPAL_CLIENT_ID
    const clientSecret = process.env.PAYPAL_SECRET_KEY
    const { data } = await axios.post('https://api-m.sandbox.paypal.com/v1/oauth2/token',
        'grant_type=client_credentials',
        {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Accept': 'application/json',
                'Accept-Language': 'en_US'
            },
            auth: {
                username: clientId,
                password: clientSecret
            }
        })


    console.log(data)

    const response = await axios.post("https://api-m.sandbox.paypal.com/v2/checkout/orders", order, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${data.access_token}`
        }
    })
    console.log(response.data)

    return res.cookie("token", response.data.id).send(response.data)
}

export const paymentCheckOut = async (req, res) => {

    try {
        const clientId = process.env.PAYPAL_CLIENT_ID
        const clientSecret = process.env.PAYPAL_SECRET_KEY
       const { token } = req.query
        const response = await axios.post(`https://api-m.sandbox.paypal.com/v2/checkout/orders/${token}/capture`, {}, {
           
        auth: {
            username: clientId,
            password: clientSecret
        }

        })
        console.log(response.data.id)
        if(!response.data.id){
            return res.status(401).send({
                success:false,
                message:"Paymnet Not Successfull"
            })
        }
        const  updateOrder = await movieBookingModel.findByIdAndUpdate({_id:req.params.id},{isPaid:true,paymentId:response.data.id})

        res.status(200).send({
            success:true,
            message:"Movie Ticket Book",
            updateOrder
        })
        return true
    } catch (error) {
        console.log(error)
        return res.status(401).send({
            success:false,
            message:"Error In Captutre payment API"
        })
    }
}