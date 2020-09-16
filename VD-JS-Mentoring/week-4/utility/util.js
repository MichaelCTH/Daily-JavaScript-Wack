const fs = require('fs');

module.exports.stat = (file) => new Promise((resolve, reject) => {
  fs.stat(file, (err, resp) => {
    if (err) {
      reject(err);
    } else {
      resolve(resp);
    }
  });
});
