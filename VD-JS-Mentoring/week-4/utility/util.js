const fs = require('fs');
const path = require('path');

module.exports.stat = (file) => new Promise((resolve, reject) => {
  fs.stat(file, (err, resp) => {
    if (err) {
      reject(err);
    } else {
      resolve(resp);
    }
  });
});

module.exports.listFiles = (folder) => {
  const files = fs.readdirSync(folder);
  return files.map((f) => {
    const stat = fs.statSync(path.join(folder, f));
    return {
      name: f, createdDate: new Date(stat.atime).toLocaleString(), size: stat.size,
    };
  });
};
