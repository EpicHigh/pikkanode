const Router = require("koa-router");
const signUpQueries = require("../db/queries/signup_querry");

const router = new Router();
const BASE_URL = `/signup`;

router.get(BASE_URL, async ctx => {
  try {
    ctx.body = {
      status: "success"
    };
  } catch (err) {
    console.log(err.message);
  }
});

module.exports = router.routes();