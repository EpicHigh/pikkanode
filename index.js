const Koa = require("koa");
const Router = require("koa-router");
const serve = require("koa-static");
const session = require("koa-session");
const path = require("path");
const Pug = require("koa-pug");
const koaBody = require("koa-body");
const signIn = require("./scripts/auth/signin");
const signUp = require("./scripts/auth/signup");
const signInCtrl = require("./scripts/controller/signinCtrl");

//require internal files
//any new
const app = new Koa();
const router = new Router();
const pug = new Pug({
  viewPath: "views",
  debug: false,
  pretty: false,
  compileDebug: false,
  basedir: "views",
  app: app // equals to pug.use(app) and app.use(pug.middleware)
});

//session setting
const sessionStore = {};
const sessionConfig = {
  key: "sess",
  maxAge: 1000 * 60 * 60,
  httpOnly: true,
  store: {
    get(key, maxAge, { rolling }) {
      return sessionStore[key];
    },
    set(key, sess, maxAge, { rolling }) {
      sessionStore[key] = sess;
    },
    destroy(key) {
      delete sessionStore[key];
    }
  }
};

//check flash message
const flash = async (ctx, next) => {
  // Flash middleware
  if (!ctx.session) throw new Error("flash message required session");
  ctx.flash = ctx.session.flash;
  ctx.session.flash = {};
  await next();
};

//any router
router.get("/", ctx => {
  ctx.render(`index`);
});

router.get("/signin", (ctx, next) => {
  ctx.render(`signin`, signIn);
  //next();
});

router.post("/signin", (ctx, next) => {
  next();
});

router.get("/signup", (ctx, next) => {
  ctx.render(`signup`, signUp);
  next();
});

router.post("/signup", (ctx, next) => {
  signUp.checkUserInput(ctx);
  next();
});

app.keys = ["supersecret"]; /**/
app.use(koaBody());
app.use(session(sessionConfig, app));
app.use(serve(path.join(__dirname, "public")));
app.use(router.routes());
app.use(router.allowedMethods());
app.use(flash);
//app.use(ctx => console.log(ctx.request.header));
app.use(async ctx => {const suscess = await signInCtrl.signinCtrl(ctx);
	console.log(suscess)});
app.use(ctx => {
  console.log(`value of userID call from${ctx.session.userId}`);
});
app.listen(3000);
