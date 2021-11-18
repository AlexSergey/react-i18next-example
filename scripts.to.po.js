const path = require('path');
const { execSync } = require('child_process');
const { readFileSync, readdirSync, writeFileSync, mkdirSync, existsSync } = require('fs');
const { i18nextToPot } = require('i18next-conv');

function getPOFiles(src) {
  return readdirSync(src)
    .filter((file) => {
      const parts = file.split('.');

      if (parts.length > 0) {
        return parts[1] === 'po';
      }

      return false;
    });
}

const makePot = async (options = {}) => {
  const lang = options.lang || 'en';
  const src = options.src   || './locale/en.json';
  const dist = options.dist || './translations';
  const DEFAULT_FILENAME = 'messages.pot';

  const translation = await i18nextToPot(lang, readFileSync(src), {
    base: readFileSync(src, 'utf8'),
    keyasareference: true
  });

  if (!existsSync(dist)) mkdirSync(dist, '0777', true);

  writeFileSync(path.join(dist, DEFAULT_FILENAME), translation);
  const poFiles = getPOFiles(dist);

  for (let i = 0, l = poFiles.length; i < l; i++) {
    const po = poFiles[i];
    const query = [
      'msgmerge',
      ' --backup=off',
      ' -U',
      ` ${path.join(dist, po)}`,
      ` ${path.join(dist, DEFAULT_FILENAME)}`,
      ' --force-po'
    ].join('');
    try {
      execSync(query);
    } catch (error) {
      console.error(error);
    }
  }
}

makePot({
  src: './src/i18n/dictionary.json'
})
