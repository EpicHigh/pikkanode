module.exports.flash = async (ctx, next) => {
	// Flash middleware
	if (!ctx.session) {
		throw new Error("flash message required session");
	}
	ctx.flash = ctx.session.flash;
	ctx.loginSuccess = ctx.session.loginSuccess;
	ctx.userId = ctx.session.userId;
	ctx.registerSuccess = ctx.session.registerSuccess;
	ctx.uploadSuccess = ctx.session.uploadSuccess;
	delete ctx.session.flash;
	delete ctx.session.loginSuccess;
	delete ctx.session.registerSuccess;
	delete ctx.session.uploadSuccess;
	await next();
};
