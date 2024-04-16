import { scheduleJob } from "node-schedule";
import logger from "./utils/logger.js";
import { findNewNotification } from "./services/notification.service.js";
import axios from "axios";
import loggerPrint from "./utils/printLogger.js";
import io from "./server.js";
import { runApi } from "./services/axios.js";
let RUN_TIME = " */10 * * * * *";
scheduleJob(RUN_TIME,async(fireDate)=>{
    try {
        console.log("Cron Run" + fireDate);
        logger.info(`Cron Run ${RUN_TIME}` + new Date())
        console.log('cron run' + RUN_TIME + new Date());
        // const getNotification = await findNewNotification();

        //GET IN AXIOS
        // const youtube = await runApi('get','http://localhost:4040/api/v1/trainseat/slot/65ee7ea6da21723a4609072c',{})

        //POST IN AXIOS
        const youtube = await runApi('post','http://localhost:4040/api/v1/train/',{
            "category":"train",
            "name":"abc express",
            "license_plate":"ab453as2",
            "sourceStn":"abc",
            "destinationStn":"xyz",
            "viaStations":["def","ghi","lmn"],
            "totalDistance":550,
            "classes":["FC","CC","SL"],
            "capacity":250,
            "aAuth":"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWUxNTY5MGUyNTg2YzE4N2U1ZGJlOTkiLCJpYXQiOjE3MTMyNjAwMDIsImV4cCI6MTcxMzg2NDgwMn0.7a6n13YmbsKiKtmxJxsoxY4wuApy3AJu44sRhDnTP9s"
        })

        //PUT IN AXIOS

        // const youtube = await runApi('put','http://localhost:4040/api/v1/train/661e495a5052a4317356561e',{
        //     "category":"train",
        //     "name":"abc express1",
        //     "aAuth":"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWUxNTY5MGUyNTg2YzE4N2U1ZGJlOTkiLCJpYXQiOjE3MTMyNjAwMDIsImV4cCI6MTcxMzg2NDgwMn0.7a6n13YmbsKiKtmxJxsoxY4wuApy3AJu44sRhDnTP9s"
        // })


        //DELETE IN AXIOS

        // const youtube = await runApi('delete','http://localhost:4040/api/v1/train/661e495a5052a4317356561e',{
        //     headers:{
        //         cookie:'aAuth="Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWUxNTY5MGUyNTg2YzE4N2U1ZGJlOTkiLCJpYXQiOjE3MTMyNjAwMDIsImV4cCI6MTcxMzg2NDgwMn0.7a6n13YmbsKiKtmxJxsoxY4wuApy3AJu44sRhDnTP9s"'

        //     }
        // })

        console.log(youtube);
        // const youtube = await axios.get("https://www.youtube.com/watch?v=2df8PMfajDQ");
        // logger.info(youtube.data)
        // console.log(youtube);
        // console.log(getNotification,);
        // io.emit('sendMessage',getNotification.message)
    } catch (error) {
        console.log(error,error.message);
    }
})