let magentoUtil = require('../utils/magento2');
let Customer = require('../models/customer');

const CUSTOMERS_URL = '/V1/customers';

module.exports = {
  createCustomer: (req, res, next) => {
    let email = req.body.email;
    let firstName = req.body.firstname;
    let lastName = req.body.lastname;
    let password = req.body.password;

    let customerData = Customer.createUser(firstName, lastName, email);

    let data = {
      'customer': customerData,
      'password': password
    }

    magentoUtil.magentoPost(CUSTOMERS_URL, data, (resp, err) => {
      if (err) {
        let statusText = err.response.data.message;
        return next(null, statusText);
      }
      return next(resp.id, null);
    });
  }
}
