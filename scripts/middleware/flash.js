module.exports.flash = async (ctx, next) => {
	// Flash middleware
	if (!ctx.session) {
		throw new Error("flash message required session");
	}
	ctx.flash = ctx.session.flash;
	delete ctx.session.flash;
	await next();
};