let magentoUtil = require('../utils/magento2');

const COUNTRY_PATH = '/V1/directory/countries';

module.exports = {
  getCountries: (res, next) => {
    magentoUtil.magentoGet(COUNTRY_PATH, null, (response, err) => {
      const modifiedCountries = [];
      response.forEach(country => {
        const name = country['full_name_english'];
        const modifiedCountry = {
          'id': country['id']
        };
        if (name !== null) {
          modifiedCountry['name'] =  res.locale === 'en' ? name : res.translate(name);
        } else {
          modifiedCountry['name'] = null;
        }
        modifiedCountries.push(modifiedCountry);
      });
      return next(modifiedCountries, err);
    });
  }
}
