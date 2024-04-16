 const successResponse = (res, response) => {
  const { statusCode, data, message, header } = response;
  // console.log(response);
  if(header){
      res.set(header);
  }
  return res.status(statusCode).json({
    status:"success",
    message: message,
    data: data,
  });
};



export default successResponse