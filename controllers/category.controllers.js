import categoryModel from "../models/categoryModel.js";
import { categoryAddValidation, categoryUpdateValidation } from "../validation/category.validation.js";

export const addCategoryController = async(req,res)=>{
    try {
        const {name,type} = req.body;
      const validateCategory =   categoryAddValidation.validate();
      if(validateCategory.error){
        return res.status(401).send({
            success:false,
            message:validateCategory.error.message
        })
      }
      const category = new categoryModel({
        name,type
      })
      await category.save();
      res.status(200).send({
        success:true,
        message:"Category Added",
        category
      })
    } catch (error) {
        console.log(error);
        return res.status(401).send({
            success:false,
            message:"Error In category Added API",
            error
        })
    }
}

export const getAllCategoryController = async (req,res)=>{
    try {
        const categories = await categoryModel.find({});
        if(!categories[0]){
            return res.status(200).send({
                success:true,
                message:"Pls! Add Categories"
            })
        }
        res.status(200).send({
            success:true,
            message:"All Categories",
            data:categories
        })
    } catch (error) {
        console.log(error)
        return res.status(401).send({
            success:false,
            message:"Error In getAll categories API"
        })
    }
}

export const updateCategoryController = async (req,res)=>{
    try {
        const {name,category}=req.body
        const checkData = categoryUpdateValidation.validate(req.body)
        if(checkData.error){
            return res.status(401).send({
                success:false,
                message:checkData.error.message
            })
        }
        const {id} = req.params
        const checkCategory = await categoryModel.findById(id);
        if(!checkCategory){
            return res.status(401).send({
                success:false,
                message:"Category not Available"
            })
        }
        if(name)checkCategory.name=name;
        if(category)checkCategory.category=category;
        const updateCategory = await checkCategory.save();
        if(!updateCategory){
            return res.status(401).send({
                success:false,
                message:"category Doesn't updated"
            })
        }
        res.status(200).send({
            success:true,
            message:"Category Updated",
            updateCategory
        })
    } catch (error) {
        console.log(error);
        res.status(401).send({
            success:false,
            message:"Error in Category Update API"
        })
    }
}


export const categorySortTypeController = async (req,res)=>{
    try {
        const categories = await categoryModel.find({type:req.params.sort})
        if(!categories){
            return res.status(401).send({
                success:false,
                message:"Doesn't have Categories Type as a "+req.params.sort,
            })
        }
        res.status(200).send({
            success:true,
            message:"Categories Sort By "+req.params.sort,
            data:categories
        })
    } catch (error) {
        console.log(error);
        res.status(401).send({
            success:false,
            message:"Error in Category Sort By Type API"
        })
    }
}

export const categoryDeleteController = async (req,res)=>{
    try {
        const {id}=req.params
        const checkCategory = await categoryModel.findById(id);
        if(!checkCategory){
            return res.status(401).send({
                success:false,
                message:"Category Not Found"
            })
        }
        const deleteCategory = await checkCategory.deleteOne();
        if(!deleteCategory){
            return res.status(401).send({
                success:false,
                message:"category cannot Deleted"
            })
        }
        res.status(200).send({
            success:true,
            message:"Category Deleted",
            deleteCategory
        })
    } catch (error) {
        console.log(error);
        return res.status(401).send({
            success:false,
            message:"Error In Category deleted API",
            error
        })
    }
}