const Router = require("koa-router"),
	signin = require("../controller/signinCheckUserInput");

const router = new Router();

//For keep any session
async function alertMessage(ctx) {
	const data = {
		flash: ctx.flash,
		userId: ctx.userId
	};
	if (data.userId) {
		return ctx.redirect("/");
	} else {
		await ctx.render("signin", data);
	}
}

router.get("/signin", alertMessage);
router.post("/signin", signin.checkUserInput);

module.exports = router.routes();
