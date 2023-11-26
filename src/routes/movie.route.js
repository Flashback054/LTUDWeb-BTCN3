const express = require("express");

const router = express.Router();

const movieController = require("../controllers/movie.controller");

router.get("/", movieController.getAllMovies);
router.get("/:id", movieController.getMovieById);
router.get("/search/:searchStr", movieController.getMovieBySearch);
router.get("/top5rated", movieController.getTop5RatedMovies);
router.get("/topboxoffice", movieController.getTopBoxOfficeMovies);
router.get("/favorites", movieController.getFavoriteMovies);
router.post("/favorites", movieController.addFavoriteMovie);
router.delete("/favorites/:id", movieController.deleteFavoriteMovie);
router.get("/:id/reviews", movieController.getReviewsByMovieId);

module.exports = router;
