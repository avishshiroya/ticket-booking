import express from "express"
import morgan from "morgan"
import bodyParser from "body-parser"
import cookieParser from "cookie-parser"
import dotenv from "dotenv"
import fs from "fs"

dotenv.config();
const app = express();
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(cookieParser())
app.use(morgan("dev"))


//connectDB
import connectDb from "./config/db.js"
connectDb()


// to save the logger in the text file *********
const todayDate = new Date();
var accessLogStream = fs.createWriteStream(`loggers/${todayDate.getDate()}_${todayDate.getMonth()}_${todayDate.getFullYear()}_access.log`, { flags: 'a' }) // create a write stream (in append mode)
// console.log(accessLogStream)
app.use(morgan('[:date[clf]] :method :url :status :response-time ms - :res[content-length]', { stream: accessLogStream }))
//home routes

//routes
import Routes from "./routes/index.js"
app.use("/api/v1", Routes)

app.get("/", async (req, res) => {
    res.status(200).send({
        success: true,
        message: "First Routes 214 214"
    })
})

const PORT = process.env.PORT || 4040
app.listen(PORT, (err, res) => {
    if (err) {
        console.log(err);
    } else {
        console.log(`Port ${PORT} run successfully`)
    }
})