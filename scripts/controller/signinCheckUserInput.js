//Mock a user
const user = {
	"email-address": "epic@high.com",
	password: "034812703"
};

function checkUserInput(ctx) {
	const inputEmail = ctx.request.body["email-address"];
	const inputPass = ctx.request.body["password"];
	console.log(inputEmail);
	console.log(inputPass);
	if (inputEmail === user["email-address"] && inputPass === user["password"]) {
		ctx.session.loginSuccess = {success: true};
		ctx.session.userId = {id: 555};
		return ctx.redirect("/");
	} else if (inputEmail === user["email-address"]) {
		ctx.session.flash = {
			error: "Your password is incorrect. Please try again."
		};
		return ctx.redirect("/signin");
	} else if (
		String(inputEmail).includes(" ") ||
		String(inputPass).includes(" ")
	) {
		ctx.session.flash = {
			error: "Email address or password cannot be spaces."
		};
		return ctx.redirect("/signin");
	} else {
		ctx.session.flash = {
			error:
				"Your email address does not signed up. Please <a href='/signup'>sign up</a>."
		};
		return ctx.redirect("/signin");
	}
}

module.exports = {
	checkUserInput
};