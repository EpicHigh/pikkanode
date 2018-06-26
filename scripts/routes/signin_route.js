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
	const inputEmail = ctx.request.body["email-address"];
	const inputPass = ctx.request.body["password"];
	if ((inputEmail === user["email-address"] && inputPass === user["password"])) {
		ctx.session.loginSuccess = {success: true};
		ctx.session.userId = {id: 555};
		return ctx.redirect("/");
	} else {
		ctx.session.flash = {error: "Failed"};
		return ctx.redirect("/signin");
	}
}

router.get("/signin", alertMessage);
router.post("/signin", checkUserInput);

module.exports = router.routes();