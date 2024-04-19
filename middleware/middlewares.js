import morgan from "morgan";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import cors from "cors";
import loggerPrint from "../utils/printLogger.js";
// import apicache from "apicache";
import express from "express";
import errorHandler from "./errorHandler.js";

export default (app) => {
  dotenv.config();
  // const cache = apicache.middleware;
  app.use(express.json());
  app.use(express.static("public"));

  // app.use((error, req, res, next) => {
  //   console.log(error + "  1");
  //   // if (error) {
  //     const errorStatus = error.status || 500;
  //      res.status(errorStatus).json({
  //       status: "error",
  //       message: error.message,
  //       data: [],
  //     });
  //   // }
  // });
  // app.use(bodyParser.json())
  app.use(morgan("dev"));
  // app.use(loggerPrint);
  app.use(cors());
  app.use(cookieParser());
  // app.use(cache("5 minutes"));
};
