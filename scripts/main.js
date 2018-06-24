const Koa = require('koa');
const Pug = require("koa-pug");
const path = require('path');
const serve = require("koa-static");
//routes
const indexRoutes = require('./routes/indexroute');
const signinRoutes = require('./routes/signinroute');
//config
const app = new Koa();
const PORT = 1337;
const pug = new Pug({
	viewPath: "views",
	basedir: "views",
	app: app // equals to pug.use(app) and app.use(pug.middleware)
});
// app.use
app.use(indexRoutes);
app.use(signinRoutes);
app.use(serve(path.join(__dirname + '/../public')));
//app.use(createRoutes);
// listen
app.listen(PORT);

