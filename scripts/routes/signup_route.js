const Router = require("koa-router");
const signUpQueries = require("../db/queries/signup_querry");

const router = new Router();

router.get("/signup", async ctx => {
	const data = {
		flash: ctx.flash,
		userId: ctx.userId
	};
  try {
	  if (data.userId) {
		  return ctx.redirect("/");
	  } else {
		  ctx.render("signup");
	  }
  } catch (e) {
	  console.log(e.message);
	  ctx.body = e.message;
  }
});

module.exports = router.routes();
