const Router = require('koa-router');
const fs = require('fs');
const path = require('path');
const { stat } = require('../utility/util');
const { set } = require('../db');

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
  const files = ctx.state.user.files || [];
  await ctx.render('admin', { files });
});

home.post('file', async (ctx) => {
  if (!ctx.request.files || !ctx.request.files.file) {
    ctx.redirect('/');
    return;
  }
  const { files } = ctx.request;
  if (files.file.length === 0) {
    ctx.redirect('/');
    return;
  }
  const { user } = ctx.state;
  if (!Array.isArray(files.file)) { files.file = [files.file]; }
  await files.file.forEach(async (file) => {
    const destPath = path.join(
      'public/files',
      `${Math.random().toString().substr(2, 6)}_${file.name}`,
    );

    const reader = fs.createReadStream(file.path);
    const stream = fs.createWriteStream(destPath);
    reader.pipe(stream);
    if (!user.files) { user.files = []; }
    user.files = [...user.files, {
      name: destPath,
      createdDate: (new Date()).toLocaleDateString(),
      size: file.size,
    }];
    await set(user.username, JSON.stringify(user));
  });

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
