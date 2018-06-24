const knex = require("../connection");
const bcrypt = require("bcrypt");

async function hashing(pwd) {
  return await bcrypt.hash(pwd, 10);
}

function registerUser(email, pwd) {
  knex("users")
    .insert({
      email: email,
      password: hashing(pwd)
        .then(res => res)
        .catch(e => console.error(e.message))
    })
    .returning("*")
    .then(res => console.log(`insert successfully: ${res}`))
    .catch(e => console.error(e.message));
}

module.exports = {
  registerUser
};