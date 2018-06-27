const knex = require("../connection");
const uuidv4 = require("uuid/v4");
//Add a picture to database
function addPikka(caption, user_id) {
	knex("pictures")
    .insert({
	    id: createID(),
      caption: caption,
      created_by: user_id
    })
    .returning("*")
	.then(res => console.log(`Create successfully: ${res}`))
    .catch(err => console.error(err.message));
}
//Show any pictures where user_id
function showPikka(user_id) {

}

function createID() {
	const id = uuidv4();
	return String(id).slice(0, String(id).indexOf("-"));
}


module.exports = {
	addPikka
};
