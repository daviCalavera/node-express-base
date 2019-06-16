/**
 * Module Dependencies
 */
import bodyParser from 'body-parser';
import compress from 'compression';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import dnscache from 'dnscache';
import express from 'express';
import favicon from 'serve-favicon';
import path from 'path';

import routes from './routes';
import * as errors from './modules/errors';

/**
  * Initialize Server
  */
const api = express();

dnscache({
	enable: true,
  ttl: 300,
  cachesize: 1000
});

// Set proxy configuration
api.enable('trust proxy');
api.set('x-powered-by', false);

api.use(favicon(path.join(__dirname, '../public', 'favicon.ico')));
api.use(cors());
api.use(compress());
api.use(bodyParser.json({limit: '250mb'}));
api.use(bodyParser.urlencoded({extended: true}));
api.use(cookieParser());

// version
api.use((req, res, next) => {
  // req.version is used to determine the version
  req.version = req.headers['accept-version'] || req.params.apiversion || 'v0';
  next();
});

routes(api);

api.use(errors.logErrMiddleware);

// catch 404 and forward to error handler
api.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

export default api;
