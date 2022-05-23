const {readdir, readFile, appendFile, rm, mkdir} = require('fs/promises');
const path = require('path');
const srcPath = path.join(__dirname, 'styles');
const destPath = path.join(__dirname, 'project-dist');

merge();

async function merge() {
  await rm(destPath, {recursive: true, force: true});
  await mkdir(destPath, {recursive: true});
  await mergeStyles(srcPath, destPath);
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