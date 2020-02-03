let axios = require('axios');

const axiosConfig = {
  headers: {
    'Authorization': 'Bearer uulbfv3bozwp0wbvyax39o0348elq21f'
  },
};

const BASE_MAGENTO2_URL = 'https://m2.leanscale.com/rest';

module.exports = {
  magentoGet: function(url, queryParams, next) {
    let path = BASE_MAGENTO2_URL + url;
    if (queryParams) {
        path += queryParams;
    }
    axios
        .get(path, axiosConfig)
        .then(response => {
          return next(response.data, null);
        })
        .catch(err => {
          return next(null, err);
        });
  }
}
