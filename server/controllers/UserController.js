import model from '../models';
import passwordManager from '../helpers/passwordManager';
import tokenManager from '../helpers/tokenManager';

const { User } = model;

/**
 * @class userController
 * @description contains the methods used to carry out operations on a user
 */
class UserController {
  /**
   * @static
   * @param {object} req - request object
   * @param {object} res - response object
   * @return {res} res - Response object
   * @memberof userController
   */
  static async signupUser(req, res) {
    try {
      const {
        fullName, userName, email, password, roleId
      } = req.body;
      const hashedPassword = await passwordManager.hashPassword(password);
      const foundUser = await User.findOne({ where: { email } });
      if (foundUser) {
        return res.status(409).send({
          status: 'failure',
          message: 'Email already exists.Enter another email'
        });
      }
      const createdUser = await User.create({
        userName,
        fullName,
        email,
        password: hashedPassword,
        roleId,
        authTypeId: 1
      });
      const token = await tokenManager.createToken(createdUser);
      return res.status(201).json({
        token,
        status: 'success',
        message: 'Registered a new user'
      });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }
}

export default UserController;
