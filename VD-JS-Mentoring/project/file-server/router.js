const Router = require('koa-router');

const auth = require('./Routes/auth');
const home = require('./Routes/home');

const router = new Router();

router.use('/auth/', auth.routes(), auth.allowedMethods());
router.use('/', home.routes(), home.allowedMethods());

module.exports = router;
