const fs = require('fs');
const path = require('path');
const dirName = path.join(__dirname,'text.txt');
const readableStream = fs.ReadStream(dirName, 'utf-8');

readableStream.on('data', function(chunk) {
  console.log(chunk);
});
