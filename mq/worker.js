import { sendMailOtp } from "../utils/sendMail.js";
import logger from "../utils/logger.js";
const emailQueueProcessor = async (job,done)=>{
    try {
        setTimeout(async() => {
            //--single--
            // await sendMailOtp(job.data.user)
            // logger.info(`Send Email of job ${job.data.user}`);

            //---- multiple ---
            await sendMailOtp(job.data)
            logger.info(`Send Email of job ${job.data}`);
        }, 100);
           // done();
     
    } catch (error) {
        // console.log(error);
        logger.error(`error in job ${job.id}`)
            // console.log(`error in job ${job.id}`);     
    }
}

export default emailQueueProcessor