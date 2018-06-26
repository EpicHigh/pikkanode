const Router = require("koa-router");

const router = new Router();

router.post("/signout", async ctx => {
	try {
		delete ctx.session.userId;
		return ctx.redirect("/");
	} catch (e) {
		console.log(e.message);
		ctx.body = e.message;
	}
});

module.exports = router.routes();