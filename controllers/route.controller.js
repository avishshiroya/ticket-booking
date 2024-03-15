import routesModel from "../models/RoutesModels.js"
import categoryModel from "../models/categoryModel.js"
import logger from "../utils/logger.js"
import { addRoutesValidation, checkCategoryForSearchRoutesValidation, checkFromForSearchRoutesValidation, checkToForSearchRoutesValidation, updateRoutesValidation } from "../validation/routes.validation.js"


export const addRoutesController = async (req, res) => {
    try {

        const { category, from, to } = req.body
        const checkDetails = addRoutesValidation.validate(req.body, {
            abortEarly: false
        })
        if (checkDetails.error) {
            logger.error(checkDetails.error.message +" add routes")
            return res.status(400).json({
                "status":"error",
                message: checkDetails.error.message
            })
        }
        const checkCategory = await categoryModel.findOne({ name: category });
        if (!checkCategory) {
            logger.error("Category not found addRoutes")
            return res.status(400).json({
                "status":"error",
                message: "Category Not Found"
            })
        }
        const routes = new routesModel({
            createdBy: req.admin._id, categoryId: checkCategory._id, from, to
        })
        const saveRoutes = await routes.save();
        res.status(200).json({
            "status":"success",
            message: "Routes Added",
            data:saveRoutes
        })
    } catch (error) {
        console.log(error)
        logger.error("Error in routes add")
        return res.status(400).json({
            "status":"error",
            message: "Internal Error"
        })
    }
}

export const getRoutesController = async (req, res) => {
    try {
        const allRoutes = await routesModel.find({});
        if (!allRoutes[0]) {
            logger.error("Routes not found  getroutes")
            return res.status(400).json({
                "status":"error",
                message: "Please Add Routes"
            })
        }
        res.status(200).json({
            "status":"success",
            message: "All Routes",
            data:allRoutes
        })
        logger.info("get all routes")
    } catch (error) {
        console.log(error)
        logger.error("Error in get all routes")
        return res.status(500).json({
            "status":"error",
            message: "Internal Error",
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
            logger.error(checkDetails.error.message + " updateroute")
            return res.status(400).json({
                "status":"error",
                message: checkDetails.error.message
            })
        }
        const checkRoutes = await routesModel.findById(req.params.id);
        if (!checkRoutes) {
            logger.error("routes not found  updateroute")
            return res.status(400).json({
                "status":"error",
                message: "Routes Not Found"
            })
        }
        console.log(checkRoutes);
        if (category) {
            const checkCategory = await categoryModel.findOne({ name: category });
            logger.error("category not available  updateroute")
            if (!checkCategory) {
                return res.status(400).json({
                    "status":"error",
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
            logger.error("route cannot update ")
            return res.status(400).json({
                "status":"success",
                message: "Route Cannot Update"
            })
        }
        res.status(200).json({
            "status":"success",
            message: "Update Routes",
            data:updateRoutes
        })
        logger.info("Route updated")
    } catch (error) {
        console.log(error)
        logger.error("Error in route update")
        return res.status(400).json({
            "status":"error",
            message: "Internal Error"
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
            logger.error(categoryValidation.error.message +" searchroutebycategory")
            return res.status(400).json({
                "status":"error",
                message: categoryValidation.error.message
            })
        }
        console.log(category)
        const checkCategory = await categoryModel.findOne({ name: category })
        if (!checkCategory) {
            logger.error("Category not found  searchroutebycategory")
            return res.status(400).json({
                "status":"error",
                message: "category Not Found"
            })
        }
        console.log(checkCategory)
        const routes = await routesModel.find({ categoryId: checkCategory._id });
        console.log(routes)
        if (!routes[0]) {
            logger.error("Route not found searchroutebycategory")
            return res.status(400).json({
                "status":"error",
                message: "Routes Not Found"
            })
        }
        res.status(200).json({
            "status":"success",
            message: "Routes on category " + category,
            routes
        })
        logger.info("router get by category")
    } catch (error) {
        console.log(error);
        logger.error("Error in getroutebycategory")
        return res.status(500).json({
            "status":"error",
            message: "Internal Error"
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
            logger.error(checkFrom.error.message +" searchroutesbyfrom")
            return res.status(400).json({
                "status":"error",
                message: checkFrom.error.message
            })
        }
        const routes = await routesModel.find({ from });
        console.log(routes)
        if (!routes[0]) {
            logger.error("routes not found  searchroutesbyfrom")
            return res.status(400).json({
                "status":"error",
                message: "Routes Not Found"
            })
        }
        res.status(200).json({
            "status":"success",
            message: "Routes on From  " + from,
            data:routes
        })
        logger.error("get Routes by from")
    } catch (error) {
        logger.error("Error in searchRoutesByFromController API")
        return res.status(500).json({
            "status":"error",
            message: "Internal Error"
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
            logger.error(checkTo.error.message +" searchroutesbyto")
            return res.status(400).json({
                "status":"error",
                message: checkTo.error.message
            })
        }
        const routes = await routesModel.find({ to });
        console.log(routes)
        if (!routes[0]) {
            logger.error("routes not found  searchroutesbyto")
            return res.status(400).json({
                "status":"error",
                message: "Routes Not Found"
            })
        }
        res.status(200).json({
            "status":"success",
            message: "Routes on to  " + to,
            routes
        })
        logger.info("get routes by searching with to")
    } catch (error) {
        logger.error("Error in searchRoutesByToController API")
        return res.status(500).json({
            "status":"error",
            message: "Internal Error"
        })
    }
}

export const deleteRoutesController = async (req, res) => {
    try {
        const { id } = req.params;
        const checkRoutes = await routesModel.findById(id);
        if (!checkRoutes) {
            logger.route("routes not found deleteroutes")
            return res.status(400).json({
                "status":"error",
                message: "routes not found"
            })
        }
        const deleteRoutes = await checkRoutes.deleteOne();
        if (!deleteRoutes) {
            logger.error("cannot route delete")
            return res.status(400).json({
                "status":"error",
                message: "Cannot route Delete"
            })
        }
        res.status(200).json({
            "status":"success",
            message: "Routes Deleted",
        })
        logger.info("Route delete successfully")
    } catch (error) {
        console.log(error);
        logger.error("Error in delete routes API")
        return res.status(500).json({
            "status":"error",
            message: "Internal Error"
        })
    }
}