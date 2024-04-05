import logger from "./logger.js";

function loggerPrint(req, res, message) {
  // console.log(`custom ${req.method} ${req.originalUrl} ${req.headers['user-agent']} ${req.message} `);
  // console.log(req);
  // console.log(res.statusCode,res);
//   console.log(message);
  logger.info(
    ` ${req.method} ${req.originalUrl} ${req.headers["user-agent"]} ${message} `
  );
//   next();
}

export default loggerPrint;
