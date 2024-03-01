import routesModel from "../models/RoutesModels.js"
import categoryModel from "../models/categoryModel.js"
import { addRoutesValidation, checkCategoryForSearchRoutesValidation, checkFromForSearchRoutesValidation, checkToForSearchRoutesValidation, updateRoutesValidation } from "../validation/routes.validation.js"


export const addRoutesController = async (req, res) => {
    try {

        const { category, from, to } = req.body
        const checkDetails = addRoutesValidation.validate(req.body, {
            abortEarly: false
        })
        if (checkDetails.error) {
            return res.status(401).send({
                success: false,
                message: checkDetails.error.message
            })
        }
        const checkCategory = await categoryModel.findOne({ name: category });
        if (!checkCategory) {
            return res.status(401).send({
                success: false,
                message: "Category Not Found"
            })
        }
        const routes = new routesModel({
            createdBy: req.admin._id, categoryId: checkCategory._id, from, to
        })
        const saveRoutes = await routes.save();
        res.status(200).send({
            success: true,
            message: "Routes Added",
            saveRoutes
        })
    } catch (error) {
        console.log(error)
        return res.status(401).send({
            success: false,
            message: "Error in Routes Add API"
        })
    }
}

export const getRoutesController = async (req, res) => {
    try {
        const allRoutes = await routesModel.find({});
        if (!allRoutes[0]) {
            return res.status(200).send({
                success: false,
                message: "Please Add Routes"
            })
        }
        res.status(200).send({
            success: true,
            message: "All Routes",
            allRoutes
        })
    } catch (error) {
        console.log(error)
        return res.status(401).send({
            success: false,
            message: "Error in get all routes API",
            error
        })
    }
}

export const updateRoutesController = async (req, res) => {
    try {
        const { category, from, to } = req.body
        const checkDetails = updateRoutesValidation.validate(req.body, {
            abortEarly: false
        })
        if (checkDetails.error) {
            return res.status(401).send({
                success: false,
                message: checkDetails.error.message
            })
        }
        const checkRoutes = await routesModel.findById(req.params.id);
        if (!checkRoutes) {
            return res.status(401).send({
                success: false,
                message: "Routes Not Found"
            })
        }
        console.log(checkRoutes);
        if (category) {
            const checkCategory = await categoryModel.findOne({ name: category });
            if (!checkCategory) {
                return res.status(401).send({
                    success: false,
                    message: 'Category Not Available'
                })
            }

            if (checkCategory._id) checkRoutes.categoryId = checkCategory._id
        }
        if (from) checkRoutes.from = from;
        if (to) checkRoutes.to = to;
        if (req.admin._id) checkRoutes.updatedBy = req.admin._id

        const updateRoutes = await checkRoutes.save();
        if (!updateRoutes) {
            return res.status(401).send({
                success: true,
                message: "Route Cannot Update"
            })
        }
        res.status(200).send({
            success: true,
            message: "Update Routes",
            updateRoutes
        })
    } catch (error) {
        console.log(error)
        return res.status(401).send({
            success: false,
            message: "Error in routes update API"
        })
    }
}

export const searchRoutesByCategoryController = async (req, res) => {
    try {
        const { category } = req.body
        const categoryValidation = checkCategoryForSearchRoutesValidation.validate(req.body, {
            abortEarly: false
        })
        if (categoryValidation.error) {
            return res.status(401).send({
                success: false,
                message: categoryValidation.error.message
            })
        }
        console.log(category)
        const checkCategory = await categoryModel.findOne({ name: category })
        if (!checkCategory) {
            return res.status(401).send({
                success: false,
                message: "category Not Found"
            })
        }
        console.log(checkCategory)
        const routes = await routesModel.find({ categoryId: checkCategory._id });
        console.log(routes)
        if (!routes[0]) {
            return res.status(401).send({
                success: false,
                message: "Routes Not Found"
            })
        }
        res.status(200).send({
            success: true,
            message: "Routes on category " + category,
            routes
        })
    } catch (error) {
        console.log(error);
        return res.status(401).send({
            success: false,
            message: "Error In Find Routes with Category API"
        })
    }
}

export const searchRoutesByFromController = async (req, res) => {
    try {
        const { from } = req.body
        const checkFrom = checkFromForSearchRoutesValidation.validate(req.body, {
            abortEarly: false
        })
        if (checkFrom.error) {
            return res.status(401).send({
                success: false,
                message: checkFrom.error.message
            })
        }
        const routes = await routesModel.find({ from });
        console.log(routes)
        if (!routes[0]) {
            return res.status(401).send({
                success: false,
                message: "Routes Not Found"
            })
        }
        res.status(200).send({
            success: true,
            message: "Routes on From  " + from,
            routes
        })
    } catch (error) {
        return res.status(401).send({
            success: false,
            message: "Error in searchRoutesByFromController API"
        })
    }
}

export const searchRoutesByToController = async (req, res) => {
    try {
        const { to } = req.body
        const checkTo = checkToForSearchRoutesValidation.validate(req.body, {
            abortEarly: false
        })
        if (checkTo.error) {
            return res.status(401).send({
                success: false,
                message: checkTo.error.message
            })
        }
        const routes = await routesModel.find({ to });
        console.log(routes)
        if (!routes[0]) {
            return res.status(401).send({
                success: false,
                message: "Routes Not Found"
            })
        }
        res.status(200).send({
            success: true,
            message: "Routes on to  " + to,
            routes
        })
    } catch (error) {
        return res.status(401).send({
            success: false,
            message: "Error in searchRoutesByToController API"
        })
    }
}

export const deleteRoutesController = async (req, res) => {
    try {
        const {id}=req.params;
        const checkRoutes = await routesModel.findById(id);
        if(!checkRoutes){
            return res.status(401).send({
                success:false,
                message:"routes not found"
            })
        }
        const deleteRoutes = await checkRoutes.deleteOne();
        if(!deleteRoutes){
            return res.status(401).send({
                success:false,
                message:"Csnnot User Delete"
            })
        }
        res.status(200).send({
            success:true,
            message:"Routes Deleted",
            deleteRoutes
        })
    } catch (error) {
        console.log(error);
        return res.status(401).send({
            success:false,
            message:"Error in delete routes API"
        })
    }
}