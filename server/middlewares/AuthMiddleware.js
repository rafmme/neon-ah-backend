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
  static async checkIfUserIsAuthenticated(req, res, next) {
    try {
      const { authorization } = req.headers;
      if (!authorization) {
        return response(res, 401, 'failure', 'You are not logged in.');
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
        return response(res, 401, 'failure', 'You need to log in again');
      }

      return response(res, 500, 'failure', 'An error occured on the server', error.message);
    }
  }

  /**
     * @static
     * @description checks login status of a request
     * @param {*} req - request object
     * @param {*} res response object
     * @param {*} next - next callback
     * @returns {*} calls the next middleware
     * @memberof VerifyUser
     */
  static async checkAuthStatus(req, res, next) {
    try {
      const { authorization } = req.headers;
      const token = authorization.split(' ')[1];
      const decoded = TokenManager.verify(token);
      if (decoded) {
        req.user = decoded;
        return next();
      }
    } catch (error) {
      req.isLoggedIn = false;
      next();
    }
  }

  /**
   * @static
   * @description - a middleware that checks if the user is an admin
   * @param {object} req - a request object
   * @param {object} res - a response object
   * @param {object} next - the next middleware function
   * @returns {object} - a message whether the user is an admin or not
   * @memberof AuthMiddleware
   */
  static checkIfUserIsAdmin(req, res, next) {
    try {
      const { authorization } = req.headers;
      if (!authorization) {
        return response(res, 401, 'failure', 'You are not logged in.');
      }

      const token = authorization.split(' ')[1];
      const decoded = TokenManager.verify(token);

      if (decoded) {
        req.user = decoded;
      }

      if (req.user.roleId !== '3ceb546e-054d-4c1d-8860-e27c209d4ae4' && req.user.roleId !== '2023afbb-7072-4759-8161-3d149c9589f2') {
        return response(res, 403, 'failure', 'You are unauthorised to access this page.');
      }
      return next();
    } catch (error) {
      const { name } = error;
      if (name === 'TokenExpiredError' || name === 'JsonWebTokenError') {
        return response(res, 401, 'failure', 'You need to log in again');
      }

      return response(res, 500, 'failure', 'An error occured on the server', error);
    }
  }

  /**
   * @static
   * @description - a middleware that checks if the user is a  superadmin
   * @param {object} req - a request object
   * @param {object} res - a response object
   * @param {object} next - the next middleware function
   * @returns {object} - a message whether the user is an admin or not
   * @memberof AuthMiddleware
   */
  static checkIfUserIsSuperAdmin(req, res, next) {
    try {
      const { authorization } = req.headers;
      if (!authorization) {
        return response(res, 401, 'failure', 'You are not logged in.');
      }

      const token = authorization.split(' ')[1];
      const decoded = TokenManager.verify(token);

      if (decoded) {
        req.user = decoded;
      }
      if (req.user.roleId !== '2023afbb-7072-4759-8161-3d149c9589f2') {
        return response(res, 403, 'failure', 'You are unauthorised to access this page.');
      }
      return next();
    } catch (error) {
      const { name } = error;
      if (name === 'TokenExpiredError' || name === 'JsonWebTokenError') {
        return response(res, 401, 'failure', 'You need to log in again');
      }

      return response(res, 500, 'failure', 'An error occured on the server', error);
    }
  }
}

export default AuthMiddleware;
