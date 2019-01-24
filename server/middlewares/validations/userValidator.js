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

  /**
   * @static
   * @param {object} req HTTP request object.
   * @param {object} res HTTP response object.
   * @param {function} next the next middleware function.
   * @returns {object} returns appropriate error message.
   * @memberof UserValidator
   */
  static editProfileValidate(req, res, next) {
    req.sanitizeBody('useName').trim();
    req
      .check('bio')
      .optional()
      .withMessage('Bio cant be empty')
      .isString()
      .withMessage('Bio can only be string');

    req
      .check('fullName')
      .optional()
      .notEmpty()
      .withMessage('Fullname cannot be empty')
      .isString()
      .withMessage('Fullname can only be string')
      .isLength({ max: 100 })
      .withMessage('Max length exceeded');

    req
      .check('password')
      .optional()
      .notEmpty()
      .withMessage('Password cannot be empty')
      .isString()
      .withMessage('Fullname can only be string')
      .isLength({ min: 8 })
      .withMessage('Password must be at least 8 characters');

    req
      .check('notifySettings')
      .optional()
      .notEmpty()
      .withMessage('Notification settings cannot be empty')
      .isBoolean()
      .withMessage('Notification settings must be a Boolean');

    req
      .check('userName')
      .optional()
      .trim()
      .notEmpty()
      .withMessage('Username cannot be empty')
      .isString()
      .withMessage('Username must be a string');

    req
      .check('img')
      .optional()
      .isString()
      .withMessage('img must be a string');

    // eslint-disable-next-line prefer-const
    let { hasError, errorMessages } = Util.extractErrorMessages(req.validationErrors());
    const { userName } = req.body;

    if (typeof userName === 'number') {
      hasError = true;
      errorMessages.userName = 'Username can be only string';
    }
    if (hasError === true) {
      return res.status(400).send({
        status: 'failure',
        data: {
          error: errorMessages
        }
      });
    }
    next();
  }
}

export default UserValidator;
