const passport = require('koa-passport');
const Router = require('koa-router');
const { addUser } = require('../auth');

const auth = new Router();

auth.get('register', async (ctx) => {
  ctx.redirect('/register.html');
});

auth.post('register', async (ctx) => {
  addUser(ctx.request.body.username, ctx.request.body.password);
  return passport.authenticate('local', (err, user) => {
    if (user) {
      ctx.login(user);
      ctx.redirect('/status.html');
    } else {
      ctx.redirect('/register.html');
    }
  })(ctx);
});

auth.get('login', async (ctx) => {
  if (!ctx.isAuthenticated()) {
    ctx.redirect('/login.html');
  } else {
    ctx.redirect('/status.html');
  }
});

auth.post('login', async (ctx) => passport.authenticate('local', (err, user) => {
  if (user) {
    ctx.login(user);
    ctx.redirect('/status.html');
  } else {
    ctx.redirect('/register.html');
  }
})(ctx));

auth.get('logout', async (ctx) => {
  if (ctx.isAuthenticated()) {
    ctx.logout();
    ctx.redirect('/login.html');
  } else {
    ctx.redirect('/404.html');
  }
});

module.exports = auth;
