import morgan from "morgan";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import cors from "cors";
import loggerPrint from "../utils/printLogger.js";
// import apicache from "apicache";
import express from "express";


export default (app) => {
  dotenv.config();
  // const cache = apicache.middleware;
  app.use(express.json());
  app.use(express.static("public"));
  

  // app.use(bodyParser.json())
  app.use(morgan("dev"));
  // app.use(loggerPrint);
  app.use(cors());
  app.use(cookieParser());
  // app.use(cache("5 minutes"));
};
