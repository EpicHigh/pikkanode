const Router = require("koa-router");

const router = new Router();

router.get("/", async ctx => {
	const data = {
		loginSuccess: ctx.loginSuccess,
		userId: ctx.userId
	};
	try {
		ctx.render("index", data);
  } catch (e) {
    console.log(e.message);
    ctx.body = e.message;
  }
});

module.exports = router.routes();
