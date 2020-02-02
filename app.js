import express from 'express';
let app = express();

import {convertLanguage} from './i18n';
app.use('/api/V1', convertLanguage);

import v1Route from './routes/v1';
app.use('/api/V1', v1Route);

export default app;
