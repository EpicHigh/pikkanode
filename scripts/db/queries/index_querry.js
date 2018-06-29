const knex = require("../connection");

async function showPikka() {
	return await knex.select().from("pictures").orderBy("created_at", "DESC");
}

async function countLike(pictureID) {
	try {
		if (pictureID !== undefined) {
			const count = await knex("likes")
			.count("picture_id")
			.where({picture_id: pictureID});
			return count[0]["count(`picture_id`)"];
		} else {
			return 0;
		}
	} catch (e) {
		console.log(`countLike ${e.message}`);
	}
}

module.exports = {
	showPikka
};