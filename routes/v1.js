let express = require('express');
let bodyParser = require('body-parser');
let router = express.Router();

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

let countriesController = require('../controllers/countries');
let categoriesController = require('../controllers/categories');
let productsController = require('../controllers/products');
let customersController = require('../controllers/customers');

const { customerValidationRules, validate } = require('../utils/validator');


// healthcheck
router.get('/health', (req, res, next) => {
  return res.status(200).json({'status': res.locale === 'en' ? 'OK' : res.translate('OK')});
});


// countries
router.get('/countries', (req, res, next) => {
  countriesController.getCountries(res, (response, err) => {
    if (err) {
      return res.status(500).json({'error': err});
    }
    return res.status(200).json(response);
  });
});


// categories
router.get('/categories', (req, res, next) => {
  categoriesController.getCategories(res, (response, err) => {
    if (err) {
      return res.status(500).json({'error': err});
    }
    return res.status(200).json(response);
  });
});


// products
router.get('/products', (req, res, next) => {
  productsController.getProducts(req, res, (response, err) => {
    if (err) {
      return res.status(500).json({'error': err});
    }
    return res.status(200).json(response);
  })
});


// customers
router.post('/customers', customerValidationRules(), validate, (req, res, next) => {
  customersController.createCustomer(req, res, (responseJson, err) => {
    let responseObject = {};
    if (err) {
      responseObject['success'] = false;
      responseObject['errors'] = {
        backend: res.locale === 'en' ? err : res.translate(err)
      };
      return res.status(400).json(responseObject);
    }
    responseObject['success'] = true;
    responseObject['id'] = responseJson;
    return res.status(201).json(responseObject);
  });
});


module.exports = router;
