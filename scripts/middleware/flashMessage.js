module.exports.flash = async (ctx, next) => {
	// Flash middleware
	if (!ctx.session) {
		throw new Error("flash message required session");
	}
	console.log(ctx.session);
	ctx.flash = ctx.session.flash;
	ctx.loginSuccess = ctx.session.loginSuccess;
	ctx.userId = ctx.session.userId;
	delete ctx.session.flash;
	delete ctx.session.loginSuccess;
	await next();
};