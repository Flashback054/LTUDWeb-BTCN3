const db = require("../database/database.js");

class Review {
	async findReviewByMovieId(movieId) {
		return await db.any(`SELECT * FROM review WHERE movieId = $1`, [movieId]);
	}
}

module.exports = new Review();
