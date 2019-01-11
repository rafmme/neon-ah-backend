import Util from '../../helpers/Util';

/**
 * @class UserValidator
 * @description describes the methids for validating user inout
 */
class UserValidator {
  /**
   * @static
   * @param {object} req HTTP request object.
   * @param {object} res HTTP response object.
   * @param {function} next the next middleware function.
   * @returns {object} returns appropriate error message.
   * @memberof UserValidator
   */
  static validateUserSignupInput(req, res, next) {
    req
      .check('fullName')
      .trim()
      .notEmpty()
      .withMessage('fullName cannot be empty')
      .isString()
      .withMessage('fullName has to be a string');

    req
      .check('userName')
      .trim()
      .notEmpty()
      .withMessage('userName cannot be empty')
      .isString()
      .withMessage('userName has to be a string');

    req
      .check('email')
      .trim()
      .notEmpty()
      .withMessage('email cannot be empty')
      .isEmail()
      .normalizeEmail()
      .withMessage('Enter email in the standard format');

    req
      .check('password')
      .trim()
      .notEmpty()
      .withMessage('password cannot be empty')
      .isString()
      .withMessage('password has to be a string');

    const { hasError, errorMessages } = Util.extractErrorMessages(req.validationErrors());
    if (hasError === true) {
      return res.status(400).send({
        status: 'failure',
        data: {
          error: errorMessages
        }
      });
    }
    return next();
  }

  /**
   * @static
   * @param {object} req HTTP request object.
   * @param {object} res HTTP response object.
   * @param {function} next the next middleware function.
   * @returns {object} returns appropriate error message.
   * @memberof UserValidator
   */
  static validateUserLoginInput(req, res, next) {
    req
      .check('email')
      .trim()
      .notEmpty()
      .withMessage('email cannot be empty')
      .isEmail()
      .normalizeEmail()
      .withMessage('Enter email in the standard format');

    req
      .check('password')
      .trim()
      .notEmpty()
      .withMessage('password cannot be empty')
      .isString()
      .withMessage('password has to be a string');

    const { hasError, errorMessages } = Util.extractErrorMessages(req.validationErrors());
    if (hasError === true) {
      return res.status(400).send({
        status: 'failure',
        data: {
          error: errorMessages
        }
      });
    }
    return next();
  }
}

export default UserValidator;
