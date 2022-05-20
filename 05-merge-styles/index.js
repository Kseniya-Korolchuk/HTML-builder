const fs = require('fs');
const path = require('path');
const srcPath = path.join(__dirname, 'styles');
const srcDest = path.resolve(__dirname, 'project-dist');

fs.mkdir(srcDest, {recursive: true}, function(){

  fs.stat(srcDest, function(err){
    if (!err) {
      fs.readdir(srcDest, function (err, items) {
        for (let i = 0; i < items.length; i++) {
          fs.unlink(path.join(srcDest, items[i]), function(err){
            if (err) console.log(err);
          });
        }
      });
    }
    
    fs.readdir(srcPath, { withFileTypes: true }, function (err, items) {
      for (let i = 0; i < items.length; i++) {  
        fs.readFile(path.join(srcPath, items[i].name), 'utf-8', function(error, data){
          const parsedPath = path.parse(path.join(srcPath, items[i].name));
          if (parsedPath.ext === '.css') {
            fs.appendFile(path.join(srcDest, 'bundle.css'), data, function(error){
              if (error) throw error;
            });
          }
        });
      }
    });
  });
});