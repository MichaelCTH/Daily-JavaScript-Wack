const http = require('http');
const Koa = require('koa');
const serve = require('koa-static');
const path = require('path');
const koaBody = require('koa-body');
const session = require('koa-session');

const passport = require('koa-passport');
const router = require('./router');

const PORT = 3000;

const app = new Koa();

app.use(koaBody({ multipart: true }));

// Sessions
app.keys = ['my_secret'];
app.use(session({}, app));

// Passport
app.use(passport.initialize());
app.use(passport.session());

// Routing
app.use(router.routes()).use(router.allowedMethods());
app.use(serve(path.join(__dirname, '/public')));

// HTTP Server
const server = http.createServer(app.callback());
server.listen(PORT, () => {
  console.log(`Server is running at port::${PORT}`);
});
