const Router = require("koa-router"),
	koaBody = require("koa-body"),
	handler = require("../controller/createUpload"),
	router = new Router();

router.get("/create", async ctx => {
	const data = {
		flash: ctx.flash,
		userId: ctx.userId,
		upload: ctx.uploadSuccess
	};
	try {
		if (!data.userId) {
			return ctx.redirect("/signin");
		} else {
			await ctx.render("create", data);
		}
	} catch (e) {
		console.log(e.message);
		ctx.body = e.message;
	}
});

router.post("/create", koaBody({multipart: true}), handler.uploadHandler);

module.exports = router.routes();
