const passport = require('koa-passport');
const Router = require('koa-router');
const { addUser } = require('../auth');

const auth = new Router();

auth.get('register', async (ctx) => {
  await ctx.render('register');
});

auth.post('register', async (ctx) => {
  await addUser(ctx.request.body.username, ctx.request.body.password);
  return passport.authenticate('local', async (err, user) => {
    if (user) {
      ctx.login(user);
      ctx.redirect('/');
    } else {
      await ctx.render('register');
    }
  })(ctx);
});

auth.get('login', async (ctx) => {
  if (!ctx.isAuthenticated()) {
    await ctx.render('login');
  } else {
    ctx.redirect('/');
  }
});

auth.post('login', async (ctx) => passport.authenticate('local', async (err, user) => {
  if (user) {
    ctx.login(user);
    ctx.redirect('/');
  } else {
    await ctx.render('login');
  }
})(ctx));

auth.get('logout', async (ctx) => {
  if (ctx.isAuthenticated()) {
    ctx.logout();
    ctx.redirect('/');
  } else {
    ctx.redirect('/404.html');
  }
});

auth.get('github', async (ctx) => passport.authenticate('github', { scope: ['user:email'] }, (err, user) => {
  ctx.login(user);
  ctx.redirect('/');
})(ctx));

auth.get('github/callback', async (ctx) => passport.authenticate('github', { failureRedirect: '/auth/login' }, (err, user) => {
  ctx.login(user);
  ctx.redirect('/');
})(ctx));

module.exports = auth;
