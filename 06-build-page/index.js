const { readFile, writeFile, readdir, copyFile, rm, mkdir} = require('fs/promises');
const path = require('path');

const srcStylesPath = path.join(__dirname, 'styles');
const srcComponentsPath = path.join(__dirname, 'components');
const srcAssetsPath = path.join(__dirname, 'assets');
const destAssetsPath = path.join(__dirname, 'project-dist', 'assets');
const destPath = path.join(__dirname, 'project-dist');


async function build() {
  await rm(destPath, {recursive: true, force: true});
  await mkdir(destPath, {recursive: true});
  await mkdir(destAssetsPath, {recursive: true});
  await fillHTML(path.join(__dirname, 'template.html'), destPath, srcComponentsPath);
  await buildCSS(srcStylesPath, destPath);
  copyAssets(srcAssetsPath, destAssetsPath);
}

build();

async function fillHTML(src, dest, parts) {
  let templateHtml = await readFile(src, 'utf-8', () => {});
  const tags = templateHtml.match(/{{\w*}}/g);
  const components = await Promise.all (
    tags.map((tag) => readFile(path.join(parts, `${tag.slice(2, -2)}.html`), 'utf-8'))
  );
  let count = 0;
  while (count < tags.length) {
    templateHtml = templateHtml.replace(tags[count], components[count]);
    count++;
  }
  writeFile(path.join(destPath, 'index.html'), templateHtml);
}

async function buildCSS(src, dest) {
  let styles = await readdir(src, {withFileTypes: true}, (err, files) => {});
  let str = '';
  for (let i = 0; i < styles.length; i++) {
    if (styles[i].name.slice(styles[i].name.length - 4) === '.css') {
      let part = await readFile(path.join(src, `${styles[i].name}`), 'utf-8');
      str += part.toString();
    }
  }
  writeFile(path.join(dest, 'style.css'), str);
}

async function copyAssets(src, dest) {
  const entities = await readdir(src, {withFileTypes: true});
  for (const entity of entities) {
    if (!entity.isFile()) {
      await mkdir(path.join(dest, entity.name), {recursive: true});
      const files = await readdir(path.join(src, entity.name), {withFileTypes: true});
      for (const file of files) {
        copyFile(path.join(src, entity.name, `${file.name}`), path.join(dest, entity.name, `${file.name}`));
      }
    }
    else {
      await copyFile(path.join(src, `${entity.name}`), path.join(dest, `${entity.name}`));
    }
  }
}