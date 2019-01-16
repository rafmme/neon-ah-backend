import TokenManager from '../helpers/TokenManager';
import MailManager from '../helpers/MailManager';
import db from '../models';
import PasswordManager from '../helpers/PasswordManager';

const { Users } = db;

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
      const user = await Users.findOne({ where: { email } });
      if (!user) {
        res.status(404).send({ status: 'failure', message: 'User not found' });
        return;
      }

      const token = TokenManager.sign({ email }, '24h');
      await MailManager.sendPasswordResetLink({ user, token });

      res
        .status(200)
        .send({ status: 'success', message: 'Kindly check your mail to reset your password' });
    } catch (error) {
      res.status(500).send({ error });
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
        return res.status(400).send({ status: 'failure', message: 'Password does not match' });
      }

      const user = await Users.findOne({ where: { email } });

      if (!user) {
        res.status(404).send({ status: 'failure', message: 'User not found' });
        return;
      }

      await Users.update(
        { password: PasswordManager.hashPassword(newPassword) },
        { where: { email } }
      );

      res.status(200).send({
        status: 'success',
        message: 'Password has been successfully updated. Kindly login.'
      });
    } catch (error) {
      if (error.name === 'TokenExpiredError' || error.name === 'JsonWebTokenError') {
        return res.status(401).send({ status: 'failure', message: error.name });
      }
      res.status(500).send({ error });
    }
  }
}

export default UserController;
