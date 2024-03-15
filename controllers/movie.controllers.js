import categoryModel from "../models/categoryModel.js";
import movieModel from "../models/moviesModel.js";
import {
  movieAUpdateValidation,
  movieAddValidation,
} from "../validation/movie.validation.js";
import logger from "../utils/logger.js";

export const movieAddController = async (req, res) => {
  try {
    if (!req.admin._id) {
      logger.error("Admin unauthorized  movieadd");
      return res.status(401).send({
        status: "error",
        message: "Admin unauthorized",
      });
    }
    const {
      title,
      genre,
      releaseYear,
      IMDB_rating,
      duration,
      casts,
      category,
    } = req.body;
    const checkCategory = await categoryModel.findOne({ name: category });
    if (!checkCategory) {
      logger.error("Category Not Found movieadd");
      return res.status(400).send({
        status: "error",
        message: "Category Not Found",
      });
    }
    const validateMovie = movieAddValidation.validate(req.body, {
      abortEarly: false,
    });
    if (validateMovie.error) {
      logger.error(validateMovie.error.message + " movieadd");
      return res.status(400).send({
        status: "error",
        message: validateMovie.error.message,
      });
    }
    const movie = new movieModel({
      categoryId: checkCategory._id,
      title,
      genre,
      releaseYear,
      IMDB_rating,
      duration,
      casts,
      createdBy: req.admin._id,
    });
    await movie.save();
    res.status(200).send({
      status: "success",
      message: "Movie created",
      data: null,
    });
    logger.info("Movie Created");
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      status: "error",
      message: "Internal Error",
      data: null,
    });
  }
};

export const movieUpdateController = async (req, res) => {
  try {
    if (!req.admin._id) {
      logger.error("Admin unauthorized  movieupdate");
      return res.status(401).send({
        status: "error",
        message: "Admin Unauthorized",
      });
    }
    const checkValidation = movieAUpdateValidation.validate(req.body, {
      abortEarly: false,
    });
    if (checkValidation.error) {
      logger.error(checkValidation.error.message + " movieupdate");
      return res.status(400).send({
        status: "error",
        message: checkValidation.error.message,
      });
    }
    const checkMovie = await movieModel.findById(req.params.id);
    if (!checkMovie) {
      logger.error("Movie not Found movieupdate");
      return res.status(401).send({
        status: "error",
        message: "Movie Not Availbale",
      });
    }
    if (category) {
      const checkCategory = await categoryModel.findOne({ name: category });
      if (!checkCategory) {
        logger.error("Category not found  movieupdate");
        return res.status(400).send({
          status: "error",
          message: "Category Not Availbale",
        });
      }
      if (checkCategory._id) checkMovie.categoryId = checkCategory._id;
    }
    const { title, genre, releaseYear, IMDB_rating, duration, casts } =
      req.body;
    if (title) checkMovie.title = title;
    if (genre) checkMovie.genre = genre;
    if (releaseYear) checkMovie.releaseYear = releaseYear;
    if (IMDB_rating) checkMovie.IMDB_rating = IMDB_rating;
    if (duration) checkMovie.duration = duration;
    if (casts) checkMovie.casts = casts;
    if (req.admin._id) checkMovie.updatedBy = req.admin._id;
    //update movie
    const updateMovie = await checkMovie.save();
    res.status(200).send({
      status: "success",
      message: "Movie Updated successfully",
      updateMovie,
    });
    logger.info("Movie updated Successfully");
  } catch (error) {
    console.log(error);
    logger.error("Error In movieUpdate");
    return res.status(500).send({
      status: "error",
      message: "Internal Error",
      error,
    });
  }
};

export const movieGetController = async (req, res) => {
  try {
    const movies = await movieModel.find({});
    if (!movies[0]) {
      logger.error("Movie not found  movieget");
      return res.status(400).send({
        status: "success",
        message: "Please Add Movies",
      });
    }
    res.status(200).send({
      status: "success",
      message: "Get All Movies",
      movies,
    });
    logger.info("Movie Get succesfuuly");
  } catch (error) {
    console.log(error);
    logger.error("Error In movieget");
    return res.status(500).send({
      status: "error",
      message: "Internal Error",
    });
  }
};

export const movieGetGenreController = async (req, res) => {
  try {
    const { type } = req.params;
    const movies = await movieModel.find({
      genre: { $regex: new RegExp(type, "i") },
    });
    if (!movies[0]) {
      logger.error("Movie not Found  moviegetgenre");
      return res.status(400).send({
        status: "error",
        message: "Not have Movies On Genre " + type,
      });
    }
    res.status(200).send({
      status: "success",
      message: "Movies On Genre " + type,
      movies,
    });
    logger.info("Movie Get by genre");
  } catch (error) {
    console.log(error);
    logger.error("Error In getmoviebygenre");
    return res.status(500).send({
      status: "error",
      message: "Internal Error",
    });
  }
};

export const movieGetCastController = async (req, res) => {
  try {
    const { name } = req.params;
    console.log(req.params.name);
    const movies = await movieModel.find({
      casts: { $regex: new RegExp(name, "i") },
    });
    if (!movies[0]) {
      logger.error("Movie not found getmoviebycast");
      return res.status(400).send({
        status: "error",
        message: "Not have Movies On Casts " + name,
      });
    }
    res.status(200).send({
      status: "success",
      message: "Movies On Casts " + name,
      data: movies,
    });
    logger.info("Get Movie By Cast")
  } catch (error) {
    console.log(error);
    logger.error("Error in getmoviebycast")
    return res.status(500).send({
      status: "error",
      message: "Internal Error",
    });
  }
};

export const deleteMovieController = async (req, res) => {
  try {
    const id = req.params.id;
    const checkMovie = await movieModel.findById(id);
    if (!checkMovie) {
        logger.error("Movie not Found deletemovie")
      return res.status(400).send({
        status: "error",
        message: "Movie Not Found",
      });
    }
    const deleteMovie = await checkMovie.deleteOne();
    if (!deleteMovie) {
        logger.error("cannot Delete Movie")
      return res.status(400).send({
        status: "error",
        message: "Cannot Delete Movies",
      });
    }
    res.status(200).send({
      status: "success",
      message: "Movie Delete Successfully",
    });
    logger.info("Movie Deleted")
  } catch (error) {
    console.log(error);
    logger.error("Error in moviedelete")
    return res.status(500).send({
      status: "error",
      message: "Internal Error",
    });
  }
};
