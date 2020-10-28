/**
 * Koa-Winston Logger
 * https://github.com/selbyk/koa-logger-winston/blob/master/index.js
 * 
 */
const chalk = require("chalk");

const STATUS_COLORS = {
  error: "red",
  warn: "yellow",
  info: "green",
};


module.exports.koaLogger = (winstonInstance) => {
  return async (ctx, next) => {
    const start = new Date();
    await next();
    const ms = new Date() - start;

    let logLevel;
    if (ctx.status >= 500) {
      logLevel = "error";
    }
    if (ctx.status >= 400) {
      logLevel = "warn";
    }
    if (ctx.status >= 100) {
      logLevel = "info";
    }

    const msg =
      chalk.gray(`${ctx.method} ${ctx.originalUrl}`) +
      chalk[STATUS_COLORS[logLevel]](` ${ctx.status} `) +
      chalk.gray(`${ms}ms`);

    winstonInstance.log(logLevel, msg);
  };
};
