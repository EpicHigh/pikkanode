const signUpQueries = require("../db/queries/signup_querry");

async function checkUserInput(ctx) {
	const inputEmail = ctx.request.body["email-address"],
		inputPass = ctx.request.body["password"],
		inputConfirmPass = ctx.request.body["confirm-password"];
	if (inputPass !== inputConfirmPass) {
		ctx.session.flash = {
			error:
				"Your password and confirm password do not match, Pleases try again."
		};
		return ctx.redirect("/signup");
	} else if (
		String(inputEmail).includes(" ") ||
		String(inputPass).includes(" ") ||
		String(inputConfirmPass).includes(" ")
	) {
		ctx.session.flash = {
			error: "Email address, password or comfirm password cannot be spaces."
		};
		return ctx.redirect("/signup");
	} else if (String(inputPass).length < 6) {
		ctx.session.flash = {
			error: "Your password length must be at least 6 characters"
		};
		return ctx.redirect("/signup");
	} else if (await signUpQueries.checkEmail(inputEmail)) {
		ctx.session.flash = {
			error: "This email has already been registered."
		};
		return ctx.redirect("/signup");
	} else {
		await signUpQueries.registerUser(inputEmail, inputPass);
		ctx.session.registerSuccess = {success: true};
		return ctx.redirect("/");
	}
}

module.exports = {
	checkUserInput
};
