const pikkaQueries = require("../db/queries/pikka_querry.js");

async function makeCommentBox(ctx) {
	let box = `<div class="top"><p>COMMENTS (${await pikkaQueries.countComment(
		ctx.params.id)})</p></div>`;
	if (await pikkaQueries.commentBox(ctx.params.id)) {
		const comment = await pikkaQueries.commentBox(ctx.params.id);
		console.log(comment);
		for (let i of comment) {
			box += `<div class="comment-box">
			<img src="https://robohash.org/${i["email"]}">
			<p class="name">${i["email"]}</p>
			<p class="c-txt">${i["text"]}</p></div>`;
		}
		return box;
	}
}

function makeCommentForm(ctx) {
	return `<form method="post" action="/pikka/${ctx.params.id}/comment">
				  <input class="input-search" type="text" name="comment" placeholder="Comment"></form>`;
}

function makeLikeButton(ctx) {
	return `<form method="post" action="/pikka/${ctx.params.id}
					/like"><button class="tag" name="Like">Like</button>
					</form>`;
}

function makeUnLikeButton(ctx) {
	return `<form method="post" action="/pikka/${
		ctx.params.id
		}/unlike"><button class="tag" name="Unlike">Unlike</button></form>`;
}

async function whichLikeOrUnlike(ctx) {
	if (ctx.userId && ctx.userId.id) {
		if (await pikkaQueries.checkLike(ctx.userId.id, ctx.params.id)) {
			return makeUnLikeButton(ctx);
		} else {
			return makeLikeButton(ctx);
		}
	}
}

module.exports = {
	makeCommentBox,
	makeCommentForm,
	whichLikeOrUnlike
};
