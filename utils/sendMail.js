import nodemailer from "nodemailer";
import logger from "./logger.js";

export const sendMailOtp = async (mail, otp, req, res) => {
  const testAccount = await nodemailer.createTestAccount();

  const transport = nodemailer.createTransport({
    // host: process.env.SMTP_HOST,
    // port: process.env.SMTP_PORT,
    // auth: {
    //   user: process.env.SMTP_USER,
    //   pass: process.env.SMTP_PASS
    // },
    // connectionTimeout: 5 * 60 * 1000, 
 
      host:'smtp.ethereal.email',
      port: 587,
      auth: {
        user: "mikayla.heidenreich2@ethereal.email",
        pass: "uVfs68J888UrpNK1vC"
      },
      // connectionTimeout: 5 * 60 * 1000, 
  
      
  });
  const subject = "OTP Verification From Ticket Booking";

  var mailOption = {
    from: process.env.SMTP_EMAIL_FROM,
    to: mail,
    subect: "OTP FROM THE TICKET BOOKING",
    html: `<div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2">
        <div style="margin:50px auto;width:70%;padding:20px 0">
          <div style="border-bottom:1px solid #eee">
            <a href="" style="font-size:1.4em;color: #00466a;text-decoration:none;font-weight:600">Ticket Booking</a>
          </div>
          <p style="font-size:1.1em;margin-bottom:2px">Hi,</p>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam illo sapiente, odio laborum molestias nihil!</p>
          <h2 style="background: #00466a;margin: 0 auto;width: max-content;padding: 0 10px;color: #fff;border-radius: 4px;">${otp}</h2>
          // <p style="font-size:0.9em;">Regards,<br />Dryclean</p>
          <hr style="border:none;border-top:1px solid #eee" />
          <div style="float:right;padding:8px 0;color:#aaa;font-size:0.8em;line-height:1;font-weight:300">            
          </div>
        </div>
      </div>`,
  };
  await transport.sendMail(mailOption, function (error, info) {
    if (error) {
      // console.log("error in mail send" + error);
      logger.info("Error Send MAil " + error.message)
    } else {
      logger.info("Mail Sended Of " + mail)
      console.log("mail send");
    }
  });
  // console.log(`email send to ${mail}`);
};
