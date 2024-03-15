// Download the helper library from https://www.twilio.com/docs/node/install
// Set environment variables for your credentials
// Read more at http://twil.io/secure
import dotenv from "dotenv"
import twilio from "twilio";
import readline1 from "readline"
// import { error } from "console";
dotenv.config()
const accountSid = process.env.TWILIO_ACCCOUNT_SID;
const authToken = process.env.TWILIO_ACCOUNT_AUTH;
const verifySid = process.env.TWILIO_VERIFY_SID;

const client = twilio(accountSid, authToken);
export const sendMSG = async (code,to, otp) => {

       await  client.messages
            .create({
                body: 'YOUR OTP IS : ' + otp,
                from: process.env.TWILIO_FROM_NUMBER,
                to: '+' + code + to,
            })
}
