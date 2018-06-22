const signIn = require("../auth/signin");

function redirectSignIn(ctx) {
  ctx.status = 303;
  ctx.redirect("/signin");
}

function redirectIndex(ctx) {
  ctx.status = 303;
	ctx.session.userId = 5125;
  ctx.redirect("/");
}

module.exports = {
  signinCtrl: async function(ctx) {
    if (ctx.request.method === "POST" && ctx.request.url === "/signin") {
      if (signIn.checkUser(ctx) === true) {
        console.log(`signIn.checkUser(ctx) === true)`);
        const valueEmailandPass = await signIn
          .checkEmailAndPass(ctx)
          .then(value => {
            if (value !== true) {
              redirectSignIn(ctx);
            }
          })
          .catch(err => {
            console.error(`เอ๋อเร๋อแล้ว ${err.message}`);
            redirectSignIn(ctx);
          });
        console.log(
          `value of await signIn.checkEmailAndPass(ctx) = ${valueEmailandPass}`
        );
        if (valueEmailandPass === true) {
          ctx.session.userId = 5125;
	        redirectIndex(ctx);
          if (ctx.session.userId === 5125) {
          	return true;
          }
          redirectSignIn(ctx);
        }
        redirectSignIn(ctx);
      }
    }
  }
};