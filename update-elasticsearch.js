let magentoUtil = require('./magento2');
let client = require('./elasticclient');

const ALL_PRODUCT_URL = '/V1/products';

client.indices.exists({
  index: 'ecommerce'
}, (existsError, existsResponse, existsStatus) => {
  if (existsResponse === false) {
    client.indices.create({
      index: 'ecommerce'
    }, (createError, createResponse, createStatus) => {
      if (createStatus === 200) {
        return populateElastic();
      }
    });
  } else {
    return populateElastic();
  }
});

function populateElastic() {
  magentoUtil.magentoGet(ALL_PRODUCT_URL, '?searchCriteria=', (response, err) => {
    if (err) {
      return console.log('Error: ', err);
    }
    const rawProducts = response.items;
    const allProducts = [];
    const finalProducts = [];
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

    allProducts.forEach((product, index) => {
      finalProducts.push({ index: { _index: 'ecommerce', _type: 'products', _id: index }});
      finalProducts.push(product);
    });
    client.bulk({body: finalProducts}, (err, resp) => {
      if (err) {
        return console.log('Elastic Search Error: ', err);
      } else {
        return console.log('Elastic Search Response: ', resp);
      }
    });
  });
}

