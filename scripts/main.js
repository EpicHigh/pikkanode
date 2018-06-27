const Koa = require("koa");
const koaBody = require("koa-body");
const Router = require("koa-router");
const Pug = require("koa-pug");
const path = require("path");
const session = require("koa-session");
const serve = require("koa-static");
//Applied to middleware
const message = require("./middleware/flashMessage");
const sessCon = require("./config/session");
//routes
const indexRoutes = require("./routes/index_route");
const signinRoutes = require("./routes/signin_route");
const signupRoutes = require("./routes/signup_route");
const signoutRoutes = require("./routes/signout_route");
const createRoutes = require("./routes/create_route");
//config
const app = new Koa();
const router = new Router();
const PORT = 1337;
const pug = new Pug({
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
app.use(serve(path.join(__dirname + "/../public")));
//app.use(createRoutes);
app.use(router.allowedMethods());
// listen
app.listen(PORT);
console.log(`PIKKANODE is listening on port ${PORT}`);