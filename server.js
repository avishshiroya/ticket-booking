import express from "express"
import morgan from "morgan"
import bodyParser from "body-parser"
import cookieParser from "cookie-parser"
import dotenv from "dotenv"
import fs from "fs"
import paypal from "paypal-rest-sdk"
import path from "path"
import winston from "winston"
const { combine, timestamp, json, prettyPrint } = winston.format
dotenv.config();

paypal.configure({
    mode: process.env.PAYPAL_MODE,
    client_id: process.env.PAYPAL_CLIENT_ID,
    client_secret: process.env.PAYPAL_CLIENT_SECRET
})
const todayDate = new Date();

export const logger = winston.createLogger({
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
const morganMiddleware = morgan(
    ':method :url :status :res[content-length] - :response-time ms',
    {
        stream: {
            // Configure Morgan to use our custom logger with the http severity
            write: (message) => logger.http(message.trim()),
        },
    }
);
const app = express();
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(cors())
app.use(cookieParser())
app.use(morganMiddleware)

// app.use('/', express.static(path.join('public'))); 

//connectDB
import connectDb from "./config/db.js"
connectDb()


// to save the logger in the text file *********
// var accessLogStream = fs.createWriteStream(`loggers/${todayDate.getDate()}_${todayDate.getMonth()}_${todayDate.getFullYear()}_access.log`, { flags: 'a' }) // create a write stream (in append mode)
// console.log(accessLogStream)
// app.use(morgan('[:date[clf]] :method :url :status :response-time ms - :res[content-length]', { stream: accessLogStream }))
//home routes

//routes
import Routes from "./routes/index.js"

app.use("/api/v1", Routes)

app.get("/", async (req, res) => {
    res.status(200).json({
        success: true,
        message: "First Routes 214 214"
    })
    // res.redirect('./public/index.html');

})

const PORT = process.env.PORT || 4040
app.listen(PORT, (err, res) => {
    if (err) {
        console.log(err);
    } else {
        console.log(`Port ${PORT} run successfully`)
    }
})

export default app