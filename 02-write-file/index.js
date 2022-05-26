const fs = require('fs');
const path = require('path');
const dirName = path.join(__dirname,'text.txt');
const readline = require('readline');
const {stdin, stdout} = require('process');
const rl = readline.createInterface({input: stdin, output: stdout});
let writeStream = fs.createWriteStream(dirName);

console.log('Hi! Write something here...');

rl.on('SIGINT', () => {
  console.log('Have a nice cross-check, bye!');
  rl.close();
});

rl.on('line', (line) => {
  if (line.toLowerCase() === 'exit') {
    console.log('Have a nice cross-check, bye!');
    rl.close();
  } else {
    writeStream.write(`${line}\n`);
  }
});