/**
 * @module ErrorAPI/errors
 */

/**
 * @export
 * @class APIError
 * @extends {Error}
 * @description create a custom error class.
 */
 class APIError extends Error {
  /**
   * @description Creates an instance of CustomError.
   * @param {string} [message] error message.
   * @param {string} [code] custom error code.
   * @param {string} [exceptionType] custom error exception type.
   * @param {*} [details] error details
   * @param {number} [statusCode] custom HTTP Status code.
   * @param {string} [name] custom error class name.
   * @memberof APIError
   */
  constructor(message, code, exceptionType, details, statusCode, name) {
    super(message, code, exceptionType, details, statusCode, name);

    Error.captureStackTrace(this, this.constructor);

    this.name = name || 'APIError';
    this.statusCode = statusCode || 400;
    this.code = code || `HTTP-${this.statusCode}`;
    this.message = message || `Error - Code: [${this.code}]`;

    if (details) {
      this.details = details;
    }

    if (exceptionType) {
      this.type = exceptionType;
    }

  }
}

/**
 * @function unprocessableEntity
 * @description The 422 (Unprocessable Entity) status code means the server understands the content type of the request entity,
 * and the syntax of the request entity is correct but was unable to process the contained instructions.
 *
 * @param {string} message error message
 * @param {string} errorCode error code to show
 * @param {string} exceptionType type error exception
 * @param {*} details aditional message data
 */
export const unprocessableEntity = (message, errorCode, exceptionType, details) => {

  return new APIError(message || 'Unprocessable Entity',
  errorCode || null,
  exceptionType || null,
  details,
  422,
  'UnprocessableEntityError');
};
