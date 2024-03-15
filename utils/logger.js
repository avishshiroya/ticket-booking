import winston from "winston"
const { combine, timestamp, json, prettyPrint } = winston.format

const todayDate = new Date();

const logger = winston.createLogger({
    level: 'http',
    format: combine(
        timestamp({
            format: 'YYYY-MM-DD hh:mm:ss.SSS A',
        }), prettyPrint()
    ),
    transports: [

        new winston.transports.File({ filename: `loggers/${todayDate.getDate()}_${todayDate.getMonth()}_${todayDate.getFullYear()}_access.log` })

    ]
})

export default logger