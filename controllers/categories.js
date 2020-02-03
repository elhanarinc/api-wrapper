let magentoUtil = require('../magento2');

const CATEGORY_PATH = '/V1/categories';

function convertName(res, data) {
  const modifiedData = data;
  modifiedData['name'] =  res.locale === 'en' ? data['name'] : res.translate(data['name']);
  if (modifiedData['children_data'] === []) {
    return modifiedData;
  } else {
    modifiedData['children_data'].forEach(children_data => {
      convertName(res, children_data);
    });
  }
  return modifiedData;
}

module.exports = {
  getCategories: function(res, next) {
    magentoUtil.magentoGet(CATEGORY_PATH, null, (response, err) => {
      const modifiedCategories = convertName(res, response);
      return next(modifiedCategories, err);
    });
  }
}
