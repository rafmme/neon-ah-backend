import TokenManager from '../helpers/TokenManager';
import MailManager from '../helpers/MailManager';
import db from '../models';
import PasswordManager from '../helpers/PasswordManager';

const { User } = db;

/**
 * @class UserController
 */
class UserController {
  /**
   *
   * @description Method to send password reset link.
   * @static
   * @param {*} req Express Request object
   * @param {*} res Express Response object
   * @returns {object} Json response
   * @memberof UserController
   */
  static async forgotPassword(req, res) {
    try {
      const { email } = req.body;
      const user = await User.findOne({ where: { email } });
      if (!user) {
        res.status(404).send({
          status: 'failure',
          data: {
            statusCode: 404,
            message: 'User not found'
          }
        });
        return;
      }

      const token = TokenManager.sign(
        {
          email
        },
        '24h'
      );

      await MailManager.sendPasswordResetLink({
        user,
        token
      });

      res.status(200).send({
        status: 'success',
        data: {
          statusCode: 200,
          message: 'Kindly check your mail to reset your password'
        }
      });
    } catch (error) {
      res.status(500).send({
        status: 'failure',
        data: {
          statusCode: 500,
          error
        }
      });
    }
  }

  /**
   * @description Method to reset user's password.
   * @static
   * @param {*} req Express Request object
   * @param {*} res Express Response object
   * @returns {object} Json response
   * @memberof UserController
   */
  static async passwordReset(req, res) {
    try {
      const { token } = req.params;

      const { email } = TokenManager.verify(token);

      const { newPassword, confirmPassword } = req.body;
      const isPasswordEqual = newPassword === confirmPassword;

      if (!isPasswordEqual) {
        return res.status(400).send({
          status: 'failure',
          data: {
            statusCode: 400,
            message: 'Password does not match'
          }
        });
      }

      const user = await User.findOne({ where: { email } });

      if (!user) {
        res.status(404).send({
          status: 'failure',
          data: {
            statusCode: 404,
            message: 'User not found'
          }
        });
        return;
      }

      await User.update(
        { password: PasswordManager.hashPassword(newPassword) },
        { where: { email } }
      );

      res.status(200).send({
        status: 'success',
        data: {
          statusCode: '200',
          message: 'Password has been successfully updated. Kindly login.'
        }
      });
    } catch (error) {
      if (error.name === 'TokenExpiredError' || error.name === 'JsonWebTokenError') {
        return res.status(401).send({
          status: 'failure',
          data: {
            statusCode: 401,
            message: error.name
          }
        });
      }
      res.status(500).send({
        status: 'failure',
        data: {
          statusCode: 500,
          message: error
        }
      });
    }
  }

  /**
   * @static
   * @param {object} req - request object
   * @param {object} response - response object
   * @return {res} res - Response object
   * @memberof userController
   */
  static async signUp(req, response) {
    try {
      const {
        fullName, userName, email, password
      } = req.body;
      const hashedPassword = await PasswordManager.hashPassword(password);
      const foundUser = await User.findOne({ where: { email } });
      if (foundUser) {
        return response.status(409).send({
          status: 'failure',
          data: {
            statusCode: 409,
            message: 'Email already exists.Enter another email'
          }
        });
      }
      const createdUser = await User.create({
        userName,
        fullName,
        email,
        password: hashedPassword,
        roleId: '{3ceb546e-054d-4c1d-8860-e27c209d4ae3}',
        authTypeId: '{15745c60-7b1a-11e8-9c9c-2d42b21b1a3e}'
      });

      const payload = {
        userId: createdUser.id,
        userName: createdUser.userName,
        userEmail: createdUser.email,
        role: createdUser.roleId
      };

      const token = await TokenManager.sign(payload, '24h');
      return response.status(201).send({
        status: 'success',
        data: {
          statusCode: 201,
          token,
          message: 'Registered a new user'
        }
      });
    } catch (err) {
      response.status(400).send({
        status: 'failure',
        data: {
          statusCode: 400,
          error: err.message
        }
      });
    }
  }

  /**
   * @static
   * @param {*} req
   * @param {*} response
   * @returns {object} Json response
   * @memberof Auth
   */
  static async logIn(req, response) {
    try {
      const { email, password } = req.body;

      const user = await User.findOne({
        where: { email }
      });

      if (!user) {
        return response.status(404).send({
          status: 'failure',
          data: {
            statusCode: 404,
            message: 'user not found'
          }
        });
      }

      const isValidPassword = PasswordManager.decryptPassword(password, user.dataValues.password);

      if (!isValidPassword) {
        return response.status(401).send({
          status: 'failure',
          data: {
            statusCode: 401,
            auth: false,
            token: null,
            message: 'Password is wrong'
          }
        });
      }

      const payload = {
        userId: user.id,
        userName: user.username,
        userEmail: user.email,
        roleId: user.roleId
      };
      const token = TokenManager.sign(payload, '360d');
      return response.status(201).send({
        status: 'Success',
        data: {
          statusCode: 201,
          message: 'User signed in successfully',
          token: `${token}`
        }
      });
    } catch (error) {
      return response.status(400).send(error);
    }
  }
}

export default UserController;
