const path = require('path');
const { gettextToI18next } = require('i18next-conv');
const { frontendCompiler } = require('@rockpack/compiler');
const { readFileSync } = require('fs');

frontendCompiler({
  styles: 'styles.css',
  vendor: ['react', 'react-dom'],
  html: {
    template: path.resolve(__dirname, './index.ejs'),
    favicon: path.resolve(__dirname, './favicon.ico')
  },
  copy: [
    {
      from: path.resolve(__dirname, './translations'),
      to: './locales/[name].json',
      filter(resourcePath) {
        const ext = '.po';
        return resourcePath.lastIndexOf('.po') === (resourcePath.length - ext.length);
      },
      async transform(content) {
        const source = content.toString();
        const re = new RegExp('Language: (\\w+)')
        const match = source.match(re)
        const language = match ? match[1] : 'en';
        return await gettextToI18next(language, source, {
          base: readFileSync('./src/i18n/dictionary.json', 'utf8'),
          keyasareference: true
        });
      }
    }
  ]
}, (config, modules) => {
  modules.set('po', {
    test: /\.po$/,
    use: [
      {
        loader: 'json-loader',
      },
      {
        loader: '@openculinary/i18next-gettext-loader',
        options: {
          keyasareference: true
        }
      }
    ]
  });
});
