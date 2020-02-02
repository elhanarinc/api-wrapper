import express from 'express';
import bodyParser from 'body-parser';

let router = express.Router();

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

import {getCountries} from '../controllers/countries';

// healthcheck
router.get('/health', (req, res, next) => {
  return res.status(200).json({'status': res.locale === 'en' ? 'OK' : res.translate('OK')});
});


// countries
router.get('/countries', (req, res, next) => {
  getCountries(res, (response, err) => {
    if (err) {
      return res.status(500).json({'error': err});
    }
    return res.status(200).json(response);
  });
});


// categories
router.get('/categories', (req, res, next) => {
  return res.status(200).json({'status': 'categories'});
});


// products
router.get('/products', (req, res, next) => {
  return res.status(200).json({'status': 'products'});
});


// customers
router.post('/customers', (req, res, next) => {
  return res.status(200).json({'status': 'OK'});
});


export default router;
