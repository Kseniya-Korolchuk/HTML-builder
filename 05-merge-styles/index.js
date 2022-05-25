const {unlink } = require('fs');
const {readdir, readFile, appendFile} = require('fs/promises');
const path = require('path');
const srcPath = path.join(__dirname, 'styles');
const destPath = path.join(__dirname, 'project-dist');

merge();

async function merge() {
  unlink(path.join(destPath, 'bundle.css'), () => {});
  mergeStyles(srcPath, destPath);
}

async function mergeStyles(src, dest) {
  const items = await readdir(src, { withFileTypes: true });
  let str = '';
  for await (let item of items) {
    if (path.extname(path.join(src, `${item.name}`)) === '.css' && item.isFile()) {
      str = await readFile(path.join(src, `${item.name}`), 'utf-8');
      await appendFile(path.join(dest, 'bundle.css'), str);
    }
  }
}