let express = require('express');
let app = express();

let i18n = require('./utils/i18n');
app.use('/api/V1', i18n.translationMiddleware);

let v1Router = require('./routes/v1');
app.use('/api/V1', v1Router);

module.exports = app;
