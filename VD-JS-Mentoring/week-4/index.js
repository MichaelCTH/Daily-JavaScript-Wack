const http = require('http');
const Koa = require('koa');
const serve = require('koa-static');
const path = require('path');
const koaBody = require('koa-body');
const session = require('koa-session');
const passport = require('koa-passport');

const router = require('./router');

const app = new Koa();
const PORT = process.env.PORT || 3000;

// Sessions
app.keys = ['my_secret'];
app.use(session({}, app));

// body parser
app.use(koaBody({ multipart: true }));

// auth
app.use(passport.initialize());
app.use(passport.session());

// Routing
app.use(router.routes()).use(router.allowedMethods());
app.use(serve(path.join(__dirname, '/public')));

// handle rests
app.use(async (ctx) => {
  ctx.redirect('/404.html');
});

// HTTP Server
const server = http.createServer(app.callback());
server.listen(PORT, () => {
  console.log(`Server is running at port::${PORT}`);
});
