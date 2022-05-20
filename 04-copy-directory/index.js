const fs = require('fs');
const path = require('path');
const srcPath = path.join(__dirname, 'files');
const srcDest = path.join(__dirname, 'files-copy');

fs.mkdir(srcDest, {recursive: true}, function(){});
fs.stat(srcDest, function(err) {
  if (!err) {
    fs.readdir(srcDest, function (err, items) {
      for (let i = 0; i < items.length; i++) {
        fs.unlink(path.join(srcDest, items[i]), function(err){
          if (err) console.log(err);
          console.log(`файл ${items[i]} удален`);  
        });
      }
    });
  }
  fs.readdir(srcPath, function (err, items) {
    for (let i = 0; i < items.length; i++) {
      fs.copyFile(path.join(srcPath,items[i]), path.join(srcDest,items[i]), function(){});
      console.log(`файл ${items[i]} скопирован`);    
    }
  });
});
