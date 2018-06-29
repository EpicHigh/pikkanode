const Router = require("koa-router"),
	gallery = require("../controller/indexGallery");
	router = new Router();

router.get("/", async ctx => {
	const data = {
		loginSuccess: ctx.loginSuccess,
		registerSuccess: ctx.registerSuccess,
		userId: ctx.userId,
		indexGallery: await gallery.makeGallery()
	};
	try {
		await ctx.render("index", data);
  } catch (e) {
    console.log(e.message);
    ctx.body = e.message;
  }
});

module.exports = router.routes();
