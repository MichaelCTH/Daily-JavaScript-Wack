const redis = require('redis');

const client = redis.createClient({ host: '127.0.0.1', port: 6379 });
client.auth('example', (err, reply) => {
  if (err) {
    console.error(err);
  }
});

client.on('error', (error) => {
  console.error(error);
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
