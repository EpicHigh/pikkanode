const Koa = require("koa"),
	koaBody = require("koa-body"),
	Router = require("koa-router"),
	Pug = require("koa-pug"),
	path = require("path"),
	session = require("koa-session"),
	serve = require("koa-static"),
	//Applied to middleware
	message = require("./middleware/flashMessage"),
	sessCon = require("./config/session"),
	//routes
	indexRoutes = require("./routes/index_route"),
	signinRoutes = require("./routes/signin_route"),
	signupRoutes = require("./routes/signup_route"),
	signoutRoutes = require("./routes/signout_route"),
	createRoutes = require("./routes/create_route"),
	pikkaRoutes = require("./routes/pikka_route"),
	//config
	app = new Koa(),
	router = new Router(),
	PORT = 1337,
	pug = new Pug({
		viewPath: "views",
		basedir: "views",
		app: app // equals to pug.use(app) and app.use(pug.middleware)
	});
app.keys = ["Secret-Services"];
// app.use

app.use(koaBody());
app.use(session(sessCon.sessionConfig, app));
app.use(message.flash);
app.use(indexRoutes);
app.use(signinRoutes);
app.use(signupRoutes);
app.use(signoutRoutes);
app.use(createRoutes);
app.use(pikkaRoutes);
app.use(serve(path.join(__dirname + "/../public")));
//app.use(createRoutes);
app.use(router.allowedMethods());
// listen
app.listen(PORT);
console.log(`PIKKANODE is listening on port ${PORT}`);
