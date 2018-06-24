const knex = require("../connection");
const uuidv4 = require("uuid/v4");
//Add a picture to database
function addPikka(caption, user_id) {
  return knex("pictures")
    .insert({
      id: uuidv4(),
      caption: caption,
      created_by: user_id
    })
    .returning("*")
    .then(res => console.log(`insert successfully: ${res}`))
    .catch(err => console.error(err.message));
}
//Show any pictures where user_id
function showPikka(user_id) {
  return knex
    .select("*")
    .table("pictures")
    .whereRaw("created_by = ?", user_id)
    .then(res => console.log(`select successfully: ${res}`))
    .catch(err => console.error(err.message));
}

module.exports = {
  addPikka,showPikka
};