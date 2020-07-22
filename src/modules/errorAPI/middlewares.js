import { log } from '../logger';

export const logErrMiddleware = (err, req, res, next) => {
  log.error(err.stack);
  next(err);
};

export const errorHandlerMiddleware = (err, req, res, next) => {
  let errJson = {
    code: err.code,
    dtls: err.details || null,
    msg: err.message,
    type: err.type
  };

  if (req.xhr) {
    res.status(500).send({ error: 'Something failed!' });
  }

  if (!process.env.NODE_ENV === 'production') {
    errJson.stack = err.stack;
  }

  res.status(err.statusCode || 500)
  .json({
    err: errJson
   });
};