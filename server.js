import express from "express";
import paypal from "paypal-rest-sdk";
import path, { dirname } from "path";
import winston from "winston";
// import loggerPrint from "./utils/printLogger.js";
import http from 'http'
import cluster from "cluster";
import os from "os";
import connectDb from "./config/db.js";
import Routes from "./routes/index.js";
import middlewares from "./middleware/middlewares.js";
import( './mq/producer.js')
import { Server } from "socket.io";
import { fileURLToPath } from "url";
const __dirname = dirname(fileURLToPath(import.meta.url));
// import( "./mq/worker.js");
import("./cron.js")



// import { createClient } from "redis";

// import logger from "./utils/logger.js"
// const totalCPUs = os.cpus().length;
// console.log(totalCPUs);
const app = express();

const server = http.createServer(app);
const io = new Server(server)


// View Engine Setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
// if (cluster.isPrimary) {
//   console.log(`Primary ${process.pid} is running`);

//   for (let i = 0; i < totalCPUs; i++) {
//     cluster.fork();
//   }
// } else {
  io.on('connection',(socket)=>{
    console.log(socket.id);
    socket.on('sendMessage',(data)=>{
      console.log(data);
      socket.emit('sendMessage',data)
    })
    socket.on('disconnect',()=>{
      console.log(`disconnect user ${socket.id}`);
    })
  })
  paypal.configure({
    mode: process.env.PAYPAL_MODE,
    client_id: process.env.PAYPAL_CLIENT_ID,
    client_secret: process.env.PAYPAL_CLIENT_SECRET,
  });
  middlewares(app)
  // app.use('/', express.static(path.join('public')));
  // app.use(morgan('[:date[clf]] :method :url :status :response-time ms - :res[content-length]', { stream: accessLogStream }))
  //connectDB
  connectDb();

  // to save the logger in the text file *********
  // var accessLogStream = fs.createWriteStream(`loggers/${todayDate.getDate()}_${todayDate.getMonth()}_${todayDate.getFullYear()}_access.log`, { flags: 'a' }) // create a write stream (in append mode)
  // console.log(accessLogStream)
  // app.use(morgan('[:date[clf]] :method :url :status :response-time ms - :res[content-length]', { stream: accessLogStream }))
  //home routes

  //routes

  app.use("/api/v1", Routes);

  app.get("/api/v1", async (req, res) => {
    res.render('Home',{message:"123"})
    // res.redirect('./public/index.html');
  });

  const PORT = process.env.PORT || 4040;
  server.listen(PORT, (err, res) => {
    if (err) {
      console.log(err);
    } else {
      console.log(`Port ${PORT} run successfully ${process.pid}`);
    }
  });
// }
export default io;
