const {rm, mkdir, readdir, copyFile} = require('fs/promises');
const path = require('path');
const srcPath = path.join(__dirname, 'files');
const destPath = path.join(__dirname, 'files-copy');

async function copying() {
  const files = await readdir(srcPath, {withFileTypes: true},(err, items) => {});
  for (const file of files) {
    copyFile(path.join(srcPath, file.name), path.join(destPath, file.name));
  }
}

async function copyFolder() {
  await rm(destPath, {recursive: true, force: true});
  await mkdir(destPath, {recursive: true});
  copying();
}

copyFolder();