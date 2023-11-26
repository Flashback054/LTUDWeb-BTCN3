const db = required("../database/database.js");

class Name {
	async populateName(name) {
		// Populate name with castMovies
		const castMovies = await db.any(
			`SELECT movie.*, name_castmovie.role
      FROM name_castmovie JOIN movie ON name_castmovie.movieId = movie.id
      WHERE nameId = $1`,
			[name.id]
		);
		name.castMovies = castMovies;

		// Populate name with images
		const images = await db.any(
			`SELECT name_image.title, name_image.image
      FROM name_image
      WHERE nameId = $1`,
			[name.id]
		);
		name.images = images;

		return name;
	}

	async populate(data) {
		if (!data) return data;

		if (Array.isArray(data)) {
			return await Promise.all(
				data.map(async (name) => {
					return await this.populateName(name);
				})
			);
		} else {
			return await this.populateName(data);
		}
	}

	async find() {
		const names = await db.any("SELECT * FROM name");
		return await this.populate(names);
	}

	async findOneById(id) {
		const name = await db.oneOrNone("SELECT * FROM name WHERE id = $1", [id]);
		return await this.populate(name);
	}

	async findOneBySearch(searchStr) {
		const names = await db.any(
			`SELECT *
      FROM name
      WHERE name ILIKE $1
      `,
			[`%${searchStr}%`]
		);

		return await this.populate(names);
	}
}

module.exports = new Name();
