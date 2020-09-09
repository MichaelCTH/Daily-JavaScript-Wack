const Router = require('koa-router');
const fs = require('fs');
const path = require('path');
const { stat, listFiles } = require('../utility/util');

const { extname } = path;
const home = new Router();

home.use(async (ctx, next) => {
  if (!ctx.isAuthenticated()) {
    await ctx.render('login');
    return;
  }
  await next();
});

home.get('/', async (ctx) => {
  const files = listFiles(path.join(__dirname, '../public/files'));
  await ctx.render('admin', { files });
});

home.post('file', async (ctx) => {
  if (!ctx.request.files || !ctx.request.files.file) {
    ctx.redirect('/');
    return;
  }
  const { file } = ctx.request.files;
  if (file.size === 0) {
    ctx.redirect('/');
    return;
  }
  const reader = fs.createReadStream(file.path);
  const stream = fs.createWriteStream(
    path.join(
      'public/files',
      `${Math.random().toString().substr(2, 6)}_${file.name}`,
    ),
  );
  reader.pipe(stream);
  ctx.redirect('/');
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
    ctx.redirect('/404.html');
  }
});

module.exports = home;
