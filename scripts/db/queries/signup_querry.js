const knex = require("../connection");
const bcrypt = require("bcrypt");

async function hashing(pwd) {
  return await bcrypt.hash(pwd, 10);
}

async function checkEmail(email) {
	const hasEmail = await knex("users").whereRaw("email = ?", email);
	return !!hasEmail[0];
	//console.log(hasEmail[0]);
}

async function registerUser(email, pwd) {
  knex("users")
    .insert({
      email: email,
	    password: await hashing(pwd)
    })
    .returning("*")
  .then(res => console.log(`Register successfully, where ID = ${res}`))
    .catch(e => console.error(e.message));
}

module.exports = {
	registerUser,
	checkEmail
};
