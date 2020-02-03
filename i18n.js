let i18n = require('i18n');

i18n.configure({
  locales: ['en', 'tr', 'ar'],
  defaultLocale: 'en',
  directory: './lang',
  autoReload: false,
  updateFiles: false,
  api: {
    '__': 'translate'
  },
});

module.exports = {
  translationMiddleware: function(req, res, next) {
    const currentLocale = req.headers['accept-language'] || 'en';
    i18n.init(req, res);
    i18n.setLocale(currentLocale);
    return next();
  }
}

