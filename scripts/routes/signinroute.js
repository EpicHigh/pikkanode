const Router = require("koa-router");

const router = new Router();

router.get("/signin", async ctx => {
	try {
		ctx.render('signin');
	} catch (e) {
		console.log(e.message);
		ctx.body = e.message;
	}
});

module.exports = router.routes();