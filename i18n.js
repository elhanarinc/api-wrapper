import i18n from 'i18n';

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

export const translationMiddleware = (req, res, next) => {
  const currentLocale = req.headers['accept-language'] || 'en';
  i18n.init(req, res);
  i18n.setLocale(currentLocale);
  return next();
}

export default i18n;
