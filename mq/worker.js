import { sendMailOtp } from "../utils/sendMail.js";

const emailQueueProcessor = async (job,done)=>{
    try {
        
          await sendMailOtp(job.data.user)
         return job.remove();
        // done();
    } catch (error) {
        console.log(error);
            console.log(`error in job ${job.id}`);     
    }
}

export default emailQueueProcessor