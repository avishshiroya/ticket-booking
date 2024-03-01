import movieModel from "../models/moviesModel.js"
import { movieAUpdateValidation, movieAddValidation } from "../validation/movie.validation.js"

export const movieAddController = async (req,res)=>{
    try {
        if(!req.admin._id){
            return res.status(401).send({
                success:false,
                message:"Admin unauthorized"
            })
        }
        const {title,genre,releaseYear,IMDB_rating,duration,casts}=req.body
        const validateMovie = movieAddValidation.validate(req.body,{
            abortEarly:false
        })
        if(validateMovie.error){
            return res.status(401).send({
                success:false,
                message:validateMovie.error.message
            })
        }
        const movie = new movieModel({
            title,genre,releaseYear,IMDB_rating,duration,casts,createdBy:req.admin._id
        })
        await movie.save();
        res.status(200).send({
            success:true,
            message:"Movie created",
            movie
        })
    } catch (error) {
        console.log(error);
        return res.status(401).send({
            success:false,
            message:"Error in Movie Add API",
            error
        })
    }
}

export const movieUpdateController = async (req,res)=>{
    try {
        if(!req.admin._id){
            return res.status(401).send({
                success:false,
                message:"Admin Unauthorized"
            })
        }
        const checkValidation = movieAUpdateValidation.validate(req.body,{
            abortEarly:false
        })
        if(checkValidation.error){
            return res.status(401).send({
                success:false,
                message:checkValidation.error.message
            })
        }
        const checkMovie = await movieModel.findById(req.params.id)
        const {title,genre,releaseYear,IMDB_rating,duration,casts}=req.body
        if(title) checkMovie.title = title;
        if(genre) checkMovie.genre = genre;
        if(releaseYear) checkMovie.releaseYear = releaseYear;
        if(IMDB_rating) checkMovie.IMDB_rating = IMDB_rating;
        if(duration) checkMovie.duration = duration;
        if(casts) checkMovie.casts = casts;
        if(req.admin._id) checkMovie.updatedBy = req.admin._id;
        //update movie
        const updateMovie = await checkMovie.save();
        res.status(200).send({
            success:true,
            message:"Movie Updated successfully",
            updateMovie
        })
    } catch (error) {
        console.log(error);
       return res.status(401).send({
        success:false,
        message:"Error in Movie update API",
        error
       }) 
    }
}

export const movieGetController = async(req,res)=>{
    try {
        const movies = await movieModel.find({});
        if(!movies[0]){
            return res.status(401).send({
                success:false,
                message:"Please Add Movies"
            })
        }
        res.status(200).send({
            success:true,
            message:"Get All Movies",
            movies
        })
    } catch (error) {
        console.log(error)
        return res.status(401).send({
            success:false,
            message:"Error in Get movies API"
        })
    }
}

export const movieGetGenreController = async (req,res)=>{
    try {
        const {type} = req.params
        const movies = await movieModel.find({genre:{$regex:new RegExp( type,'i')}});
        if(!movies[0]){
            return res.status(200).send({
                success:false,
                message:"Not have Movies On Genre "+type,
            })
        }
        res.status(200).send({
            success:true,
            message:"Movies On Genre "+type,
            movies
        })
    } catch (error) {
        console.log(error);
        return res.status(401).send({
            success:false,
            message:"Error In Get Movie ON Genre API"
        })
    }
}

export const movieGetCastController = async (req,res)=>{
    try {
        const {name} = req.params
        console.log(req.params.name)
        const movies = await movieModel.find({casts:{$regex:new RegExp( name,'i')}});
        if(!movies[0]){
            return res.status(200).send({
                success:false,
                message:"Not have Movies On Genre "+name,
            })
        }
        res.status(200).send({
            success:true,
            message:"Movies On Genre "+name,
            movies
        })
    } catch (error) {
        console.log(error);
        return res.status(401).send({
            success:false,
            message:"Error In Get Movie ON Genre API"
        })
    }
}