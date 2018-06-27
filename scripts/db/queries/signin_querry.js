const knex = require("../connection"),
	bcrypt = require("bcrypt");

//Return user ID and save it to ctx.session.userId
async function userID(email) {
	const ID = await knex("users").whereRaw("email = ?", email);
	return ID[0]["id"];
}

//Promise { <pending> }
async function comparePassword(email, password) {
	const hasEmail = await knex("users").whereRaw("email = ?", email);
	return await bcrypt.compare(password, hasEmail[0]["password"]);
}

//Promise { <pending> }
async function checkEmail(email) {
	const hasEmail = await knex("users").whereRaw("email = ?", email);
	return !!hasEmail[0];
}

module.exports = {
	userID,
	checkEmail,
	comparePassword
};
