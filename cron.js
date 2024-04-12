import { scheduleJob } from "node-schedule";
import logger from "./utils/logger.js";
let RUN_TIME = " 0 0 */1 * * *";
scheduleJob(RUN_TIME,async(fireDate)=>{
    try {
        console.log("Cron Run" + fireDate);
        logger.info(`Cron Run ${RUN_TIME}` + new Date())
        console.log('cron run' + RUN_TIME + new Date());
    } catch (error) {
        console.log(error,error.message);
    }
})