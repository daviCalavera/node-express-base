import {body, validationResult} from 'express-validator';

import * as errors from './errorAPI/errors';

const validStatusList = ['pending', 'complete', 'in progress', 'overdue'];

export const todoReqValidator = [
    body('task', 'Is required and should not be blank!')
    .exists(),
    body('status').custom((value) => {
      if (value && !validStatusList.includes(value)) {
        throw new Error(`The provided status isn\'t valid. Available statuses: ${validStatusList}`);
      }
      return true;
    }),
    (req, res, next) => {
      try {
        validationResult(req).throw();

        next();
      } catch (err) {
        const error = errors.unprocessableEntity(
          'Validation error. Invalid data',
          '001',
          'VALIDATION_EXCEPTION',
          err.array()
          );

        res.status(error.statusCode);
        next(error);
      }
    }
  ];
