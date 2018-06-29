const knex = require("../connection");

async function checkLike(userID, pictureID) {
	try {
		if (userID !== undefined) {
			const checking = await knex("likes")
			.select("user_id", "picture_id")
			.where({
				picture_id: pictureID,
				user_id: userID
			});
			return checking[0] !== undefined;
		}
	} catch (e) {
		console.log(e.message);
	}
}

async function countComment(pictureID) {
	try {
		if (pictureID !== undefined) {
			const count = await knex("comments")
			.count("text")
			.where({picture_id: pictureID});
			return count[0]["count(`text`)"];
		} else {
			return 0;
		}
	} catch (e) {
		console.log(e.message);
	}
}

async function commentBox(pictureID) {
	try {
		if (pictureID !== undefined) {
			return await knex
			.select("users.email", "comments.text")
			.from("comments")
			.leftJoin("users", "comments.created_by", "users.id")
			.where({picture_id: pictureID})
			.orderBy("created_by", "DESC")
			.limit(50);
		}
	} catch (e) {
		console.log(e.message);
	}
}

async function findCaption(pictureID) {
	try {
		if (pictureID !== undefined) {
			const caption = await knex
			.select("caption")
			.from("pictures")
			.where({id: pictureID});
			return caption[0]["caption"]
		}
	} catch (e) {
		console.log(e.message);
	}
}

async function insertComment(message, pictureID, userID) {
	try {
		knex("comments")
		.insert({text: message, picture_id: pictureID, created_by: userID})
		.returning("*")
		.then(res => console.log(`Insert comment successfully, = ${res}`))
		.catch(e => console.error(e.message));
	} catch (e) {
		console.log(e.message);
	}
}

async function like(userID, pictureID) {
	try {
		knex("likes")
		.insert({user_id: userID, picture_id: pictureID})
		.returning("*")
		.then(res => console.log(`Like successfully, = ${res}`))
		.catch(e => console.error(e.message));
	} catch (e) {
		console.log(e.message);
	}
}

async function unlike(userID, pictureID) {
	try {
		knex("likes")
		.where({picture_id: pictureID, user_id: userID})
		.del()
		.then(res => console.log(`Unlike successfully, = ${res}`))
		.catch(e => console.error(e.message));
	} catch (e) {
		console.log(e.message);
	}
}

module.exports = {
	checkLike,
	countComment,
	commentBox,
	like,
	unlike,
	insertComment,
	findCaption
};
