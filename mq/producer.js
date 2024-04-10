import  Queue  from "bull";
import emailQueueProcessor from "./worker.js";
import logger from "../utils/logger.js";
import loggerPrint from "../utils/printLogger.js";
// console.log("COnnection of redis");

const notificationQueue = new Queue('email-queue',{
    redis:{
        port:6379,
        host:'127.0.0.1'
    }
});


notificationQueue.process((job)=>{
    emailQueueProcessor(job)
})

notificationQueue.on('completed',()=>{
    console.log(`complete ${job.id}`)
    notificationQueue.removeJobs();
})
