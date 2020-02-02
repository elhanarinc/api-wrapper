import {magentoGet} from '../magento2';

const COUNTRY_PATH = '/V1/directory/countries';

export const getCountries = (res, next) => {
  magentoGet(COUNTRY_PATH, null, (response, err) => {
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
  })
};

