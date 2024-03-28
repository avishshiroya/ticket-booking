import winston from "winston"
import 'winston-daily-rotate-file'
const { combine, timestamp, json, prettyPrint,printf } = winston.format

const todayDate = new Date();

const fileRotateTransport = new winston.transports.DailyRotateFile({
    filename: 'loggers/log-%DATE%.log',
    datePattern: 'YYYY-MM-DD',
  });

  
const myFormat = printf(({level,message,timestamp})=>
{
    // const reqIP =getIp(req);
    return ` [${level}] ${timestamp}  ${message}`
})

const logger = winston.createLogger({
    level: 'http',
    format: combine(timestamp(),myFormat),
    transports: [
        fileRotateTransport        
        // new winston.transports.File({ filename: `loggers/log-${todayDate.getFullYear()}-${todayDate.getMonth()}-${todayDate.getDate()}.log` })
    ]
})

export default logger

// new winston.transports.File({ filename: `loggers/${todayDate.getDate()}_${todayDate.getMonth()}_${todayDate.getFullYear()}_access.log` })