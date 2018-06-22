const bcrypt = require("bcrypt");
//Connect the database
const knex = require("knex")({
  client: "mysql2",
  connection: {
    host: "127.0.0.1",
    user: "root",
    password: "",
    database: "pikkanode"
  }
});
//Sign up function
async function signUp(ctx) {
  const email = await ctx.request.body["email-address"];
  const pwd = await ctx.request.body.password;
  const hashedPassword = await bcrypt.hash(pwd, 10);
  registerUser(email, hashedPassword, ctx);
}
//Do password and confirm password matches?
function checkPasswordIsMatch(ctx) {
  const pwd = ctx.request.body.password;
  const conpwd = ctx.request.body["confirm-password"];
  return pwd === conpwd;
}
//Does length of password longer than 7 characters.
function checkPasswordLength(ctx) {
  const pwd = ctx.request.body.password;
  const conpwd = ctx.request.body["confirm-password"];
  return !(String(pwd).length < 8 || String(conpwd).length < 8);
}
//Is an email unique?
function checkEmail(ctx) {
  const email = ctx.request.body["email-address"];
  knex("users")
    .where("email = ?", email)
    .then(res => {
      const email = ctx.request.body["email-address"];
      const checkEmail = JSON.stringify(res).includes(email);
      //if a value duplicate entry
      if (checkEmail) {
        ctx.session.flash = "<p>This email has already been used.</p>";
        module.exports.message = ctx.session.flash;
        ctx.status = 303;
        ctx.redirect(`/signup`);
        //else user will sign up
      } else {
        signUp(ctx);
      }
    })
    .catch(err => console.error(err));
}

function registerUser(email, hashedPassword, ctx) {
  knex("users")
    .insert({
      email: email,
      password: hashedPassword
    })
    .then(res => {
      console.log(`Successful: ${res}`);
      ctx.session.flash = `<p>Welcome! you have signed up successfully.</p>`;
      module.exports.signUpSuccessfully = ctx.session.flash;
      ctx.status = 303;
      ctx.redirect(`/signup`);
    })
    .catch(err => {
      console.error(`Error: ${err}`);
      ctx.session.flash = `<p>We are sorry that somethings went wrong.</p>`;
      module.exports.signUpFailed = ctx.session.flash;
      ctx.status = 303;
      ctx.redirect(`/signup`);
      //delete ctx.session.flash;
    });
}

module.exports = {
  checkUserInput: function(ctx) {
    try {
      //console.log(`checkEmail working!`);
      if (checkPasswordLength(ctx) && checkPasswordIsMatch(ctx)) {
        checkEmail(ctx);
      } else if (checkPasswordIsMatch(ctx) === false) {
        ctx.session.flash = `<p>Your password and confirm password do not match, Please type again.</p>`;
        module.exports.message = ctx.session.flash;
        ctx.status = 303;
        ctx.redirect(`/signup`);
      } else if (checkPasswordLength(ctx) === false) {
        ctx.session.flash = `<p>Your password or confirm password should be at least 8 characters.</p>`;
        module.exports.message = ctx.session.flash;
        ctx.status = 303;
        ctx.redirect(`/signup`);
      } else if (
        checkPasswordIsMatch(ctx) === false &&
        checkPasswordLength(ctx) === false
      ) {
        ctx.session.flash = `<p>Your password and confirm password do not match, Please type again.</p><br>
													<p>Your password or confirm password should be at least 8 characters.</p>`;
        module.exports.message = ctx.session.flash;
        ctx.status = 303;
        ctx.redirect(`/signup`);
      } else {
        console.log("Oh! No");
      }
    } catch (e) {
      ctx.status = 303;
      ctx.redirect(`/signup`);
    }
  }
};