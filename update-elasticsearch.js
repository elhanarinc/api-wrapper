let magentoUtil = require('./magento2');
let elasticsearch = require('elasticsearch');

let client = new elasticsearch.Client({
  host: 'localhost:9200',
  log: 'trace',
  apiVersion: '7.5'
});

const ALL_PRODUCT_URL = '/V1/products'

magentoUtil.magentoGet(ALL_PRODUCT_URL, '?searchCriteria=', (response, err) => {
  if (err) {
    console.log('Error code: ', err.response.status);
    console.log('Error Text: ', err.response.statusText);
  }
  const rawProducts = response.items;
  const allProducts = [];
  rawProducts.forEach(rawProduct => {
    let product = {};
    product['id'] = rawProduct['id'];
    product['sku'] = rawProduct['sku'];
    product['name'] = rawProduct['name'];
    product['price'] = rawProduct['price'];
    if (rawProduct['custom_attributes']) {
      const customAttributes = rawProduct['custom_attributes'];
      customAttributes.forEach(customAttribute => {
        if (customAttribute['attribute_code'] === 'image')
          product['image'] = customAttribute['value'];
        if (customAttribute['attribute_code'] === 'description')
          product['description'] = customAttribute['value'];
      });
    }
    allProducts.push(product);
  });
  console.log(allProducts);
});
