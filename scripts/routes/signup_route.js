const Router = require("koa-router"),
	signup = require("../controller/signupCheckUserInput"),
	router = new Router();

router.get("/signup", async ctx => {
	const data = {
		flash: ctx.flash,
		userId: ctx.userId
	};
  try {
	  if (data.userId) {
		  return ctx.redirect("/");
	  } else {
		  await ctx.render("signup", data);
	  }
  } catch (e) {
	  console.log(e.message);
	  ctx.body = e.message;
  }
});
//console.log(Boolean(signUpQueries.checkEmail("pikachu@mouse.pokemon")));
router.post("/signup", signup.checkUserInput);

module.exports = router.routes();