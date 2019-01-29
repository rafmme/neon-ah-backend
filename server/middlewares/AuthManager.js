import TokenManager from '../helpers/TokenManager';
import response from '../helpers/response';
/**
 * @class AuthMiddleware
 * @description class contains function for implementing Authentication middleware
 */
class AuthManager {
  /**
   * @static
   * @description a middleware function checking if a user is authenticated
   * @param {object} req HTTP request object
   * @param {object} res HTTP response object
   * @param {function} next next middleware function
   * @returns {object} returns error message if user is not authenticated
   */
  static async checkIfUserIsLoggedIn(req, res, next) {
    try {
      const token = req.headers.authorization;
      const decoded = await TokenManager.verify(token);

      if (!token || !decoded || !decoded.userId) {
        return response(
          res,
          403,
          'failure',
          'User not Authorised!',
          null,
          null
        );
      }
      req.user = decoded;
      return next();
    } catch (error) {
      return response(res, 403, 'failure', 'User not Authorised!', null, null);
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
}

export default AuthManager;
