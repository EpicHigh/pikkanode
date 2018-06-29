const knex = require("../connection");

async function showPikka() {
	return await knex.select().from("pictures").orderBy("created_at", "DESC");
}

module.exports = {
	showPikka
};