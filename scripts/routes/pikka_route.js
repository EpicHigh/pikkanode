const Router = require("koa-router"),
	pikkaQueries = require("../db/queries/pikka_querry.js"),
	pikkaControl = require("../controller/pikkaProfile"),
	router = new Router();

router.get("/pikka/:id", async ctx => {
	const picturedID = ctx.params.id;
	const data = {
		userId: ctx.userId,
		username: ctx.session.username,
		picture: picturedID,
		caption: await pikkaQueries.findCaption(picturedID),
		likeButton: await pikkaControl.whichLikeOrUnlike(ctx),
		commentBox: await pikkaControl.makeCommentBox(ctx),
		commentForm: await pikkaControl.makeCommentForm(ctx)
	};
	try {
		await ctx.render("pikka", data);
	} catch (e) {
		console.log(e.message);
		ctx.body = e.message;
	}
});

router.post("/pikka/:id/comment", async ctx => {
	const comment = ctx.request.body["comment"];
	const pikkaID = ctx.params.id;
	await pikkaQueries.insertComment(comment, pikkaID, ctx.userId.id);
	ctx.redirect(`/pikka/${pikkaID}`);
	ctx.redirect(`/pikka/${pikkaID}`);
});

router.post("/pikka/:id/like", async ctx => {
	const pikkaID = ctx.params.id;
	pikkaQueries.like(ctx.userId.id, pikkaID);
	ctx.redirect(`/pikka/${pikkaID}`);
});

router.post("/pikka/:id/unlike", async ctx => {
	const pikkaID = ctx.params.id;
	pikkaQueries.unlike(ctx.userId.id, pikkaID);
	ctx.redirect(`/pikka/${pikkaID}`);
});

module.exports = router.routes();
