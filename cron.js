import { scheduleJob } from "node-schedule";
import logger from "./utils/logger.js";
import { findNewNotification } from "./services/notification.service.js";
import axios from "axios";
import loggerPrint from "./utils/printLogger.js";
import io from "./server.js";
let RUN_TIME = " */10 * * * * *";
scheduleJob(RUN_TIME,async(fireDate)=>{
    try {
        console.log("Cron Run" + fireDate);
        logger.info(`Cron Run ${RUN_TIME}` + new Date())
        console.log('cron run' + RUN_TIME + new Date());
        const getNotification = await findNewNotification();
        // const youtube = await axios.get("https://www.youtube.com/watch?v=2df8PMfajDQ");
        // logger.info(youtube.data)
        // console.log(youtube);
        // console.log(getNotification,);
        // io.emit('sendMessage',getNotification.message)
    } catch (error) {
        console.log(error,error.message);
    }
})