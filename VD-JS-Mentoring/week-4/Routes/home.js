const Router = require('koa-router');
const fs = require('fs');
const path = require('path');
const { stat } = require('../utility/util');

const { extname } = path;
const home = new Router();

home.use(async (ctx, next) => {
  if (!ctx.isAuthenticated()) {
    ctx.redirect('/login.html');
    return;
  }
  await next();
});

home.get('/', async (ctx) => {
  await ctx.render('admin', { name: 'hello world' });
});

home.post('file', async (ctx) => {
  if (!ctx.request.files || !ctx.request.files.file) {
    ctx.throw(401, 'bad request');
    return;
  }

  const { file } = ctx.request.files;
  const reader = fs.createReadStream(file.path);
  const stream = fs.createWriteStream(path.join('public/files', `${Math.random().toString().substr(2, 6)}_${file.name}`));
  reader.pipe(stream);

  ctx.redirect('/index.html');
});

home.param('filename', async (name, ctx, next) => {
  ctx.filename = name;
  return next();
});

home.get('file/:filename', async (ctx) => {
  try {
    const filePath = path.join('public/files', ctx.filename);
    const fstat = await stat(filePath);

    if (fstat.isFile()) {
      ctx.type = extname(filePath);
      ctx.body = fs.createReadStream(filePath);
      return;
    }
    ctx.redirect('/404.html');
  } catch (e) {
    console.log(e);
    ctx.redirect('/404.html');
  }
});

module.exports = home;
