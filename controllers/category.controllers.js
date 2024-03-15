import categoryModel from "../models/categoryModel.js";
import {
  categoryAddValidation,
  categoryUpdateValidation,
} from "../validation/category.validation.js";
import logger from "../utils/logger.js";
export const addCategoryController = async (req, res) => {
  try {
    if (!req.admin) {
      logger.error("Admin unauthorized addcategory");
      return res.status(401).send({
        status: "error",
        message: "Admin Not Authenticated",
      });
    }
    const { name, type } = req.body;
    const validateCategory = categoryAddValidation.validate(req.body, {
      abortEarly: false,
    });
    if (validateCategory.error) {
      logger.error(validateCategory.error.message + " addcategory");
      return res.status(400).send({
        status: "error",
        message: validateCategory.error.message,
      });
    }
    const category = new categoryModel({
      name,
      type,
      createdBy: req.admin._id,
    });
    await category.save();
    res.status(200).send({
      status: "success",
      message: "Category Added",
      category,
    });
    logger.info("Category add successfully");
  } catch (error) {
    console.log(error);
    logger.error("Error in add Category");
    return res.status(500).send({
      status: "error",
      message: "Internal Error",
    });
  }
};

export const getAllCategoryController = async (req, res) => {
  try {
    const categories = await categoryModel.find({});
    if (!categories[0]) {
      logger.error("Cannot get category getcategory");
      return res.status(400).send({
        status: "failed",
        message: "Pls! Add Categories",
      });
    }
    res.status(200).send({
      status: "success",
      message: "All Categories",
      data: categories,
    });
    logger.info("GetAll Category");
  } catch (error) {
    console.log(error);
    logger.error("Error in getAllCategory");
    return res.status(500).send({
      status: "error",
      message: "Internal Error",
    });
  }
};

export const updateCategoryController = async (req, res) => {
  try {
    if (!req.admin) {
      logger.error("Admin unauthorized  updatecategory");
      return res.status(401).send({
        status: "error",
        message: "Admin Not Authenticated",
      });
    }
    const { name, category } = req.body;
    const checkData = categoryUpdateValidation.validate(req.body, {
      abortEarly: false,
    });
    if (checkData.error) {
      logger.error(checkData.error.message + " updatecategory");
      return res.status(400).send({
        status: "error",
        message: checkData.error.message,
      });
    }
    const { id } = req.params;
    const checkCategory = await categoryModel.findById(id);
    if (!checkCategory) {
        logger.error("category not found  updatecategory")
      return res.status(404).send({
        status: "error",
        message: "Category not Available",
      });
    }
    if (name) checkCategory.name = name;
    if (category) checkCategory.category = category;
    if (req.admin) checkCategory.updatedBy = req.admin._id;
    const updateCategory = await checkCategory.save();
    if (!updateCategory) {
        logger.error("Error in UpdateCategory")
      return res.status(401).send({
        status: "error",
        message: "category Doesn't updated",
      });
    }
    res.status(200).send({
      status: "success",
      message: "Category Updated",
      updateCategory,
    });
    logger.info("Category updated")
  } catch (error) {
    console.log(error);
    logger.error("Error in categoryupdate")
    res.status(500).send({
      status: "error",
      message: "Invalid Error",
    });
  }
};

export const categorySortTypeController = async (req, res) => {
  try {
    const categories = await categoryModel.find({ type: req.params.sort });
    if (!categories) {
        logger.error("Not Found Category categorysortbytype")
      return res.status(401).send({
        status: "error",
        message: "Doesn't have Categories Type as a " + req.params.sort,
      });
    }
    res.status(200).send({
      status: "success",
      message: "Categories Sort By " + req.params.sort,
      data: categories,
    });
    logger.info("Category sort by type")
  } catch (error) {
    console.log(error);
    logger.error("Error in  categorySortType")
    res.status(500).send({
      status: "error",
      message: "Internal Error",
    });
  }
};

export const categoryDeleteController = async (req, res) => {
  try {
    if (!req.admin) {
        logger.error("Admin unauthorized  categorydelete")
      return res.status(401).send({
        status: "error",
        message: "Admin Not Authenticated",
      });
    }
    const { id } = req.params;
    const checkCategory = await categoryModel.findById(id);
    if (!checkCategory) {
        logger.error("Category Not Found categorydelete")
      return res.status(404).send({
        status: "error",
        message: "Category Not Found",
      });
    }
    const deleteCategory = await checkCategory.deleteOne();
    if (!deleteCategory) {
        logger.error("Category cannot Delete")
      return res.status(404).send({
        status: "error",
        message: "category cannot Deleted",
      });
    }
    res.status(200).send({
      status: "success",
      message: "Category Deleted",
      deleteCategory,
    });
    logger.info("Category delete")
  } catch (error) {
    logger.error("Error in DeleteCategory")
    console.log(error);
    return res.status(500).send({
      status: "error",
      message: "Internal Error",
      error,
    });
  }
};
