import { log } from './logger';

export const logErrMiddleware = (err, req, res, next) => {
  log.error(err.stack);
  next(err);
};