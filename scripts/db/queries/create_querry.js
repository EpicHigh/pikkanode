const knex = require("../connection");
//Add a picture to database
function addPikka(id, fileType, caption, user_id) {
	knex("pictures")
    .insert({
	    id: `${id}.${fileType}`,
      caption: caption,
      created_by: user_id
    })
    .returning("*")
	.then(res => console.log(`Create successfully: ${res}`))
    .catch(err => console.error(err.message));
}

module.exports = {
	addPikka
};
