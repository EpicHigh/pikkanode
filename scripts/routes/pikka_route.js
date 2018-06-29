const Router = require("koa-router"),
	router = new Router();

router.get("/pikka", async ctx => {
	try {
		await ctx.render("pikka");
	}
	catch (e) {
		console.log(e.message);
		ctx.body = e.message;
	}
});


module.exports = router.routes();