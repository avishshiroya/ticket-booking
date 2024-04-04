const errorResponse = (res, response) => {
    const { statusCode, message } = response;
    return res.status(statusCode).json({
      status:"error",
      message: message,
      data: [],
    });
  };

export default errorResponse