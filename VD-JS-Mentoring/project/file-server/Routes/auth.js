const passport = require('koa-passport');
const Router = require('koa-router');
const { addUser } = require('../auth');
const logger = require('../utility/Logger');

const auth = new Router();

auth.post('register', async (ctx) => {
  await addUser(ctx.request.body.username, ctx.request.body.password);
  return passport.authenticate('local', async (err, user) => {
    if (user) {
      ctx.login(user);
      ctx.body = {
        success: true,
        message: 'user has successfully authenticated',
        data: {
          user,
        },
      };
    } else {
      ctx.status = 400;
    }
  })(ctx);
});

auth.post('login', async (ctx) => passport.authenticate('local', async (err, user) => {
  if (user) {
    ctx.login(user);
    ctx.body = {
      success: true,
      message: 'user has successfully authenticated',
      data: {
        user,
      },
    };
  } else {
    ctx.status = 400;
  }
})(ctx));

auth.get('logout', async (ctx) => {
  logger.info(JSON.stringify(ctx.request.headers));
  if (ctx.isAuthenticated()) {
    ctx.logout();
  }
  ctx.body = {
    message: 'user has successfully logout',
    success: true,
  };
});

auth.get('github', async (ctx) => passport.authenticate('github', { scope: ['user:email'] }, (err, user) => {
  ctx.login(user);
  ctx.body = {
    message: 'user has successfully authenticated',
    success: true,
  };
})(ctx));

auth.get('github/callback', async (ctx) => passport.authenticate('github', { failureRedirect: '/auth/login' }, (err, user) => {
  ctx.login(user);
  ctx.body = {
    message: 'user has successfully authenticated',
    success: true,
  };
})(ctx));

module.exports = auth;
