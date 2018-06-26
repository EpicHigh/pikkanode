const Router = require("koa-router");

const router = new Router();

async function alertMessage(ctx) {
	const data = {
		flash: ctx.flash
	};
	await ctx.render("signin", data);
}

const user = {
	"email-address": "epic@high.com",
	password: "034812703"
};

function checkUserInput(ctx) {
	if (
		(ctx.request.body["email-address"] =
			user["email-address"] &&
			ctx.request.body["password"] === user["password"])
	) {
		ctx.session.loginSuccess = {success: true};
		return ctx.redirect("/");
	} else {
		ctx.session.flash = {error: "Failed"};
		return ctx.redirect("/signin");
	}
}

router.get("/signin", alertMessage);
router.post("/signin", checkUserInput);

module.exports = router.routes();