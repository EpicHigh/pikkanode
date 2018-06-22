const bcrypt = require("bcrypt");
//Connect the database
//const session = require("koa-session");
const knex = require("knex")({
  client: "mysql2",
  connection: {
    host: "127.0.0.1",
    user: "root",
    password: "",
    database: "pikkanode"
  }
});

const redDiv = `<div class="background-danger">`;
const closeDiv = `</div>`;

function checkEmail(email) {
  console.log(`check email function working`);
  return !(String(email).length === 0 || String(email).indexOf(` `) !== -1);
}

function checkPassword(pwd) {
  console.log(`check password function working`);
  return !(String(pwd).length === 0 || String(pwd).indexOf(` `) !== -1);
}

async function checkEmailIsMatch(email) {
  try {
    console.log(`check email is match function working`);
    const emailRaw = await knex("users").whereRaw("email = ?", email);
    if (Array(emailRaw).toString().length !== 0) {
      return email === emailRaw[0][`email`];
    } else {
      return false;
    }
  } catch (e) {
    console.error(e.message);
    return false;
    //return `<p>Your email is not exist</p>`;
  }
}

async function checkPasswordIsMatch(email, pwd) {
  try {
    console.log(`check password is match function working`);
    const pwdRaw = await knex
      .select("password")
      .from("users")
      .whereRaw("email = ?", email);
    if (Array(pwdRaw).toString().length !== 0) {
      return await bcrypt.compare(pwd, pwdRaw[0]["password"]);
    } else {
      return false;
    }
  } catch (e) {
    console.error(e.message);
    return false;
    //return `<p>Your password is incorrect.`;
  }
}

module.exports = {
  checkUser: function(ctx) {
    const email = ctx.request.body["email-address"];
    const pwd = ctx.request.body.password;
    console.log(`from signin.js email: ${email}`);
    console.log(`from signin.js password: ${pwd}`);
    if (checkEmail(email) && checkPassword(pwd)) {
    	console.log(`if (checkEmail(email) && checkPassword(pwd)) `);
      return true;
    } else if (checkEmail(email) === false) {
    	console.log(`else if (checkEmail(email) === false)`);
      ctx.session.flash = `${redDiv}<p>Email is required.</p>${closeDiv}`;
      return (module.exports.message = ctx.session.flash);
    } else if (checkPassword(pwd) === false) {
    	console.log(`else if (checkPassword(pwd) === false)`);
      ctx.session.flash = `${redDiv}<p>Password is required.</p>${closeDiv}`;
      return (module.exports.message = ctx.session.flash);
    } else if (checkEmail(email) === false && checkPassword(pwd) === false) {
    	console.log(`else if (checkEmail(email) === false && checkPassword(pwd) === false)`);
      ctx.session.flash = `${redDiv}<p>Email is required.</p><br><p>Password is required.</p>${closeDiv}`;
      return (module.exports.message = ctx.session.flash);
    }
  },
  checkEmailAndPass: async function(ctx) {
    const email = ctx.request.body["email-address"];
    const pwd = ctx.request.body.password;
    const isEmailMatch = await checkEmailIsMatch(email);
    const isPassMatch = await checkPasswordIsMatch(email, pwd);
    if (isEmailMatch && isPassMatch) {
    	console.log(`isEmailMatch && isPassMatch`);
      return true;
    } else if (isEmailMatch) {
    	console.log(`else if (isEmailMatch)`);
      ctx.session.flash = `${redDiv}<p>Your password is incorrect.</p>${closeDiv}`;
      return (module.exports.message = ctx.session.flash);
    } else {
    	console.log(`else`);
      ctx.session.flash = `${redDiv}<p>Your email is incorrect.</p>${closeDiv}`;
      return (module.exports.message = ctx.session.flash);
    }
  }
};