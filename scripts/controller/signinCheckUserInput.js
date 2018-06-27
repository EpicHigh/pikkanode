const signInQueries = require("../db/queries/signin_querry");

async function checkUserInput(ctx) {
	const inputEmail = ctx.request.body["email-address"];
	const inputPass = ctx.request.body["password"];
	console.log(inputEmail);
	console.log(inputPass);
	if (
		(await signInQueries.checkEmail(inputEmail)) &&
		(await signInQueries.comparePassword(inputEmail, inputPass))
	) {
		ctx.session.loginSuccess = {success: true};
		ctx.session.userId = {id: await signInQueries.userID(inputEmail)};
		return ctx.redirect("/");
	} else if (await signInQueries.checkEmail(inputEmail)) {
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