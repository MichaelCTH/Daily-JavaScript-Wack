const Router = require('koa-router');

const home = require('./Routes/home');

const router = new Router();

router.use('/', home.routes(), home.allowedMethods());

module.exports = router;
