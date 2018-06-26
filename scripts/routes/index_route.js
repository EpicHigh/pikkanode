const Router = require("koa-router");

const router = new Router();

router.get("/", async ctx => {
  try {
	  const data = {
		  loginSuccess: ctx.loginSuccess,
		  userId: ctx.userId
	  };
	  console.log(data);
	  ctx.render("index", data)
  } catch (e) {
    console.log(e.message);
    ctx.body = e.message;
  }
});

module.exports = router.routes();