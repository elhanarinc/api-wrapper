const { body, validationResult } = require('express-validator');

module.exports = {
  customerValidationRules: () => {
    return [
      body('email').isEmail().withMessage('Email is not valid.'),
      body('firstname').notEmpty().withMessage('Firstname is required.'),
      body('lastname').notEmpty().withMessage('Lastname is required.'),
      body('password').isLength(5).withMessage('Password min length is 5 and should be alphanumeric.'),
      body('password').isAlphanumeric().withMessage('Password min length is 5 and should be alphanumeric.')
    ]
  },
  validate: (req, res, next) => {
    let responseObject = {};
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      let errorArray = errors.array();
      responseObject['success'] = false;
      responseObject['errors'] = {};
      errorArray.forEach(customError => {
        responseObject['errors'][customError['param']] = res.locale === 'en' ? customError['msg'] : res.translate(customError['msg']);
      });
      return res.status(400).json(responseObject);
    } else {
      return next();
    }
  }
}
