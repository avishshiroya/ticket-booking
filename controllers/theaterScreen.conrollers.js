import theaterScreenModel from "../models/theaterScreen.js"
import theaterModel from "../models/theatersModel.js"
import { theaterScreenAddValidation, theaterScreenOnTheaterValidation, theaterScreenUpdateValidation } from "../validation/theaterScreen.validation.js"

export const addTheaterScreenControlller = async(req,res)=>{
    try {
        const {theaterId,screenType}= req.body
        const checkValidation = theaterScreenAddValidation.validate(req.body,{
            abortEarly:false
        })
        if(checkValidation.error){
            return res.status(401).send({
                success:false,
                message:checkValidation.error.message
            })
        }
        const checkTheater = await theaterModel.findById(theaterId);
        if(!checkTheater){
            return res.status(401).send({
                success:false,
                message:"Theater Not Found"
            })
        }
        const checkTheaterTotalScreen = await theaterScreenModel.find({theaterId:checkTheater._id});
        if(checkTheater.totalScreens == checkTheaterTotalScreen.length){
            return res.status(401).send({
                success:false,
                message:"You already added all screens to thaters total screens"
            })
        }
        const theaterScreen = new theaterScreenModel({
            theaterId,screenType
        })
        //save theaterScreen
        await theaterScreen.save();

        res.status(200).send({
            success:true,
            message:"Theater Screen Save",
            theaterScreen
        })
    } catch (error) {
        console.log(error)
        return res.status(401).send({
            success:false,
            message:"Error In Add Theater Screen",
            error
        })
    }
}

export const getTheaterScreenController = async (req,res)=>{
    try {
        const getAllTheaterScreen = await theaterScreenModel.find({});
        if(!getAllTheaterScreen[0]){
            return res.status(200).send({
                success:false,
                message:"Please Enter Screen"
            })
        }
        res.status(200).send({
            success:true,
            message:"get all theaters ",
            getAllTheaterScreen
        })
    } catch (error) {
        console.log(error);
        return res.status(401).send({
            success:false,
            message:"Error in Get All Theater Screen"
        })
    }
}

export const updateTheaterScreenController = async(req,res)=>{
    try {
        const {screenType} = req.body
        const checkDetails = theaterScreenUpdateValidation.validate(req.body,{
            abortEarly:false
        })
        if(checkDetails.error){
            return res.status(401).send({
                success:false,
                message:checkDetails.error.message
            })
        }
        const theaterScreen = await theaterScreenModel.findById(req.params.id);
        if(!theaterScreen){
            return res.status(401).send({
                success:false,
                message:"Theater Screen Not Found"
            })
        }
        if(screenType) theaterScreen.screenType = screenType;
        //update the theater screen
        await theaterScreen.save();
        res.status(200).send({
            success:true,
            message:"theaterScreen Update Successfully",
            theaterScreen
        })
    } catch (error) {
        console.log(error)
        return res.status(401).send({
            success:false,
            message:"Error in Update theaterScreen Controller"
        })
    }
}

export const theaterScreenOnTheaterController =  async(req,res)=>{
    try {
        const {theaterName} = req.body
        const checkDetails = theaterScreenOnTheaterValidation.validate(req.body,{
            abortEarly:false
        })
        if(checkDetails.error){
            return res.status(401).send({
                success:false,
                message:checkDetails.error.message
            })
        }
        const getTheater = await theaterModel.find({ name: { $regex: new RegExp(theaterName, 'i') } });
        if(!getTheater[0]){
            return res.status(401).send({
                success:false,
                message:"Theater Not Found",
            })
        }
        var theaters = [];
        getTheater.map((data,index)=>{
            theaters.push(data._id)
        })
        const theaterScreen = await theaterScreenModel.find({theaterId:{$in:theaters}}).populate("theaterId");
        if(!theaterScreen){
            return res.status(401).send({
                success:false,
                message:"Theater Screen Not Found"
            })
        }
        res.status(200).send({
            success:true,
            message:"Theater Screen",
            theaterScreen
        })

    } catch (error) {
        console.log(error)
        return res.status(401).send({
            success:false,
            message:"Errot in get theater screen on the theater controller"
        })
    }
}