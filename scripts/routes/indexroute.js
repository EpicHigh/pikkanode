const Router = require("koa-router");

const router = new Router();

router.get("/", async ctx => {
  try {
    ctx.render('index');
  } catch (e) {
    console.log(e.message);
    ctx.body = e.message;
  }
});

module.exports = router.routes();