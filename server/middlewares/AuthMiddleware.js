import db from '../models';
import TokenManager from '../helpers/TokenManager';
import response from '../helpers/response';


const { User } = db;


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
          { message: 'Token is invalid, You need to log in again' }
        );
      }

      return response(
        res, 500, 'failure',
        'server error',
        { message: 'Something went wrong on the server' }
      );
    }
  }

  /**
   * @static
   * @description a middleware function for checking if a user is verified
   * @param {object} req HTTP request object
   * @param {object} res HTTP response object
   * @param {function} next next middleware function
   * @returns {object} returns error message if user isn't verified
   */
  static async checkUserVerification(req, res, next) {
    try {
      const { userId } = req.user;
      const user = await User.findOne({ where: { id: userId, isVerified: true } });
      if (user) {
        return next();
      }
      return response(
        res, 403, 'failure', 'authorization error',
        { message: 'Oops! Your account isn\'t verified yet.' }
      );
    } catch (error) {
      return response(
        res, 500, 'failure',
        'server error',
        { message: 'Something went wrong on the server' }
      );
    }
  }
}

export default AuthMiddleware;
