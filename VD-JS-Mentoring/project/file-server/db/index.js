const redis = require('redis');
const logger = require('../utility/Logger');

const host = process.env.DB_HOST || '127.0.0.1';
const port = process.env.DB_PORT || 6379;

const client = redis.createClient({ host, port });
client.auth('example', (err) => {
  if (err) {
    logger.error(err);
  }
});

client.on('error', (error) => {
  logger.error(error);
});

module.exports.set = (key, value) => new Promise((resolve, reject) => {
  client.set(key, value, (err, reply) => {
    if (err) {
      reject(err);
      return;
    }
    resolve(reply);
  });
});

module.exports.get = (key) => new Promise((resolve, reject) => {
  client.get(key, (err, reply) => {
    if (err) {
      reject(err);
      return;
    }
    resolve(reply);
  });
});

module.exports.client = client;
