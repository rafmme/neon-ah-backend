import TokenManager from '../helpers/TokenManager';
import response from '../helpers/response';
/**
 * @class AuthMiddleware
 * @description class contains function for implementing Authentication middleware
 */
class AuthMiddleware {
  /**
   * @static
   * @description a middleware function checking if a user is authenticated
   * @param {object} req HTTP request object
   * @param {object} res HTTP response object
   * @param {function} next next middleware function
   * @returns {object} returns error message if user is not authenticated
   */
  static checkIfUserIsAuthenticated(req, res, next) {
    try {
      const { authorization } = req.headers;
      if (!authorization) {
        return response(
          res, 401, 'failure', 'authentication error',
          { message: 'You are not logged in.' },
          null
        );
      }

      const token = authorization.split(' ')[1];
      const decoded = TokenManager.verify(token);

      if (decoded) {
        req.user = decoded;
        return next();
      }
    } catch (error) {
      const { name } = error;
      if (name === 'TokenExpiredError' || name === 'JsonWebTokenError') {
        return response(
          res, 401, 'failure', 'authentication error',
          { message: 'Token is invalid, You need to log in again' },
          null
        );
      }

      return response(
        res, 500, 'failure',
        'server error',
        { message: 'Something went wrong on the server' }, null
      );
    }
  }
}

export default AuthMiddleware;
