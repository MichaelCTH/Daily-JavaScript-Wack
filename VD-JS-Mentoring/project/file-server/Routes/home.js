const Router = require('koa-router');
const fs = require('fs');
const path = require('path');
const { stat } = require('../utility/util');
const { set } = require('../db');
const logger = require('../utility/Logger');

const { extname } = path;
const home = new Router();

home.use(async (ctx, next) => {
  if (!ctx.isAuthenticated()) {
    ctx.status = 401;
    return;
  }
  await next();
});

home.get('isAuth',async(ctx)=>{
  ctx.body = { success: true };
});

home.get('file', async (ctx) => {
  const files = ctx.state.user.files || [];
  ctx.body = { success: true, data: { files } };
});

home.post('file', async (ctx) => {
  console.log(JSON.stringify(ctx.request.files))
  if (!ctx.request.files || !ctx.request.files.files) {
    ctx.status = 400;
    return;
  }
  const { files } = ctx.request;
  const { user } = ctx.state;

  if (!Array.isArray(files.files)) { files.files = [files.files]; }
  await files.files.forEach(async (file) => {
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

  ctx.body = { success: true };
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
    ctx.status = 404;
  } catch (e) {
    ctx.status = 404;
  }
});

module.exports = home;
