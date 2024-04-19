const errorHandler =(error, req, res, next) =>{
    if(error){
      console.log(error.status);
      const errorStatus = error.status || 500;
      const errorMessage = error.message || 'Internal Server Error'
      res.status(errorStatus).json({
        status: "error",
        message: errorMessage,
        data: [],
      });
    }
  };
  
  export default errorHandler;
  