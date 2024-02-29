export const errorHandler = (error,req,res)=>{
return res.status(401).send({
    success:false,
    message:error.message,
    error
})
}