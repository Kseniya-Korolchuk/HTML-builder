const fs = require('fs');
const path = require('path');
const srcPath = path.join(__dirname, 'files');
const srcDest = path.join(__dirname, 'files-copy');

fs.mkdir(srcDest, {recursive: true}, function(){});
fs.readdir(srcPath, function (err, items) {
  for (let i = 0; i < items.length; i++) {
    console.log(items[i]);
    fs.copyFile(path.join(srcPath,items[i]), path.join(srcDest,items[i]), function(){});
  }
});