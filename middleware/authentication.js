import JWT from "jsonwebtoken"
import userModel from "../models/userModel.js";
import adminModel from "../models/adminModels.js";
export const isAuth = async(req,res,next)=>{
    try {
        const auth= req.body.auth || req.query.auth || req.headers.auth;
        console.log(auth);
        if(!auth)
        {
            return res.status(401).send({
                success:false,
                message:"User Not Authenticated"
            })
        }
        const token = auth.split(" ")[1];
        const tokenVerify = JWT.verify(token,process.env.JWT_PASS)
        if(!tokenVerify){
            // logger.error("Token cannot Verify")
            return res.success(401).send({
                success:true,
                message:"Token cannot Verify "
            })
        }
        const user = await userModel.findById(tokenVerify);
        // console.log(user)
        if(!user){
            return res.status(401).send({
                success:false,
                message:"Login Again"
            })
        }
        // logger.info("Token verified")
        req.user = user;
        next()
        // const checkToken = 
    } catch (error) {
        return res.status(401).send({
            success:false,
            message:"Error in user Authentication API"
        })    
    }
}

 export const adminIsAuth = async (req,res,next)=>{
    try {
        const {aAuth} = req.cookies;
        console.log('123' + aAuth);
        if(!aAuth){
            return res.status(401).send({
                success:false,
                message:"Admin unAuthenticated!! Login PLS."
            })
        }
        const token = aAuth.split(" ")[1];
        const verifyToken = JWT.verify(token,process.env.JWT_PASS);
        if(!verifyToken){
            return res.status(401).send({
                success:false,
                message:"cannot Verify Admin token"
            })
        }
        const admin = await adminModel.findById(verifyToken);
        if(!admin){
            return res.status(401).send({
                success:false,
                message:"Admin Not Found"
            })
        }
        req.admin = admin
        next();
    } catch (error) {
        console.log(error);
        return res.status(401).send({
            success:false,
            message:"Error In Admin Authentication API"
        })
    }
 }