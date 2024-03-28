import logger from "./logger.js";

function loggerPrint(req, res, next ) {
    // console.log(`custom ${req.method} ${req.originalUrl} ${req.headers['user-agent']} ${req.message} `);
    logger.info(`custom ${req.method} ${req.originalUrl} ${req.headers['user-agent']} ${res.data} `);
    next();
}

export default loggerPrint;
