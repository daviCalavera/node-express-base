import { log } from '../logger';

export const logErrMiddleware = (err, req, res, next) => {
  log.error(err.stack);
  next(err);
};

export const errorHandlerMiddleware = (err, req, res, next) => {

  if (req.xhr) {
    res.status(500).send({ error: 'Something failed!' });
  }

  res.status(err.statusCode || 500)
  .json({ err });
};