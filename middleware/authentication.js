import JWT from "jsonwebtoken"
import userModel from "../models/userModel.js";
export const isAuth = async(req,res,next)=>{
    try {
        const {auth}= req.cookies;

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
            return res.success(401).send({
                success:true,
                message:"Token cannot Verify "
            })
        }
        const user = await userModel.findById(tokenVerify);
        console.log(user)
        if(!user){
            return res.status(401).send({
                success:false,
                message:"Login Again"
            })
        }
        
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