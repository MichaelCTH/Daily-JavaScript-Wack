const http = require('http');
const Koa = require('koa');
const koaBody = require('koa-body');
const session = require('koa-session');
const passport = require('koa-passport');
require('dotenv').config();
const logger = require('./utility/Logger');
const { koaLogger } = require('./utility/koa-logger-winston');
const router = require('./router');

const app = new Koa();
const PORT = process.env.SERVER_PORT || 3000;

// Logger
app.use(koaLogger(logger));

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

// handle rests
app.use(async (ctx) => {
  ctx.status = 400;
});

// HTTP Server
const server = http.createServer(app.callback());
server.listen(PORT, () => {
  logger.info(`Server is running at port::${PORT}`);
});

module.exports = server;