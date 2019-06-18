import checkValidator from 'express-validator/check';

import * as errors from './errorAPI/errors';

const { CustomError } = errors;
const { body, validationResult} = checkValidator;
const validStatusList = ['pending', 'complete', 'in progress', 'overdue'];

export const todoReqValidator = [
    body('task', 'Is required and should not be blank!')
    .exists(),
    body('status', `The provided status isn\'t valid. Available statuses: ${validStatusList}`)
    .isIn(validStatusList),
    (req, res, next) => {
      try {
        validationResult(req).throw();

        next();
      } catch (err) {
        const error = errors.unprocessableEntity('Validation error. Empty data', null, err.array());

        res.status(error.statusCode);
        next(error);
      }
    }
  ];
