// Controller for Movie
const Movie = require("../models/movie.model");
const Review = require("../models/review.model");
const catchAsync = require("../utils/catchAsync");

// GET /movies
// Get all movies
exports.getAllMovies = catchAsync(async (req, res, next) => {
	const movies = await Movie.find();
	res.status(200).json(movies);
});

// GET /movies/:id
// Get movie by id
exports.getMovieById = catchAsync(async (req, res, next) => {
	const movie = await Movie.findOneById(req.params.id);
	res.status(200).json(movie);
});

// GET /movies/search/:searchStr
// Get movie by search string
exports.getMovieBySearch = catchAsync(async (req, res, next) => {
	const movie = await Movie.findOneBySearch(req.params.searchStr);
	res.status(200).json(movie);
});

// GET /movies/top5rated
exports.getTop5RatedMovies = catchAsync(async (req, res, next) => {
	const movies = await Movie.findTop5RatedMovies();
	res.status(200).json(movies);
});

// GET /movies/topboxoffice
exports.getTopBoxOfficeMovies = catchAsync(async (req, res, next) => {
	const movies = await Movie.findTopBoxOfficeMovies();
	res.status(200).json(movies);
});

// GET /movies/favorites
exports.getFavoriteMovies = catchAsync(async (req, res, next) => {
	const movies = await Movie.findFavorites();
	res.status(200).json(movies);
});

// POST /movies/favorites
exports.addFavoriteMovie = catchAsync(async (req, res, next) => {
	const movie = await Movie.addFavorite(req.body);
	res.status(201).json(movie);
});

// DELETE /movies/favorites/:id
exports.deleteFavoriteMovie = catchAsync(async (req, res, next) => {
	const movie = await Movie.deleteFavorite(req.params.id);
	res.status(200).json(movie);
});

// GET /movies/:id/reviews
// Get reviews for movie by id
exports.getReviewsByMovieId = catchAsync(async (req, res, next) => {
	const reviews = await Review.findReviewByMovieId(req.params.id);
	res.status(200).json(reviews);
});
