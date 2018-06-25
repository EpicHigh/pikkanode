const Router = require("koa-router");

const router = new Router();

async function alertMessage(ctx) {
	const data = {
		flash: ctx.flash
	};
	await ctx.render("signin", data);
}

function checkUserInput(ctx) {
	if (
		(ctx.request.body["email-address"] =
			user["email-address"] &&
			ctx.request.body["password"] === user["password"])
	) {
		console.log("Sign in successfully");
		ctx.session.flash = {error: "Sign in successfully."};
		return ctx.redirect("back", "/signin");
	} else {
		console.log("Failed");
		ctx.session.flash = {error: "Failed"};
		return ctx.redirect("back", "/signin");
	}
}

const user = {
	"email-address": "epic@high.com",
	password: "034812703"
};

router.get("/signin", alertMessage);
router.post("/signin", checkUserInput);

module.exports = router.routes();