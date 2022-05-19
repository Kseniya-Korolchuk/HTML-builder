const fs = require('fs');
const path = require('path');
const dirName = path.join(__dirname, 'secret-folder');

fs.readdir(dirName, { withFileTypes: true }, function(err, items) {
  for (let i = 0; i < items.length; i++) {
    if (!items[i].isDirectory()) {
      const parsedPath = path.parse(path.join(dirName, items[i].name));
      fs.stat(path.join(dirName, items[i].name), (error, stat) => {
        console.log(`${parsedPath.name} — ${parsedPath.ext.slice(1)} — ${stat.size / 1000}kB`);
      });
    }
  }
});