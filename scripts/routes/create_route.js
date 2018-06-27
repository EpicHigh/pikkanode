const Router = require('koa-router');
const createQueries = require('../db/queries/create_querry');
const router = new Router();

router.get("/create", async ctx => {
	//const data = {
	//	userId: ctx.userId
	//};
	try {
		//	if (!data.userId) {
		//		return ctx.redirect("/signin");
		//	} else {
			await ctx.render("create");
		//	}
	} catch (e) {
		console.log(e.message);
		ctx.body = e.message;
	}
});

router.post("/create", async ctx => {
	//ctx.redirect("/create");
	console.log(ctx.request.files);
	console.log(ctx.request.body["caption"]);
	//console.log(ctx.request.body["photo"]);
	//ctx.body = JSON.stringify(ctx.request.body);
});

module.exports = router.routes();