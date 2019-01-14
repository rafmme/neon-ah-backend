import { error } from 'util';
import model from '../models';
import encryptData from '../utilities/encryptPassword';
import authentication from '../utilities/authentication';

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
        fullname, username, email, password
      } = req.body;
      const hashedPassword = encryptData.encryptPassword(password);
      // console.log('Here Fired');
      const foundUser = await User.findOne({ where: { email } });
      if (foundUser) {
        return 'Email already exists. Enter another email';
      }
      const createdUser = await User.Create({
        fullname,
        username,
        email,
        password: hashedPassword
      });
      const token = await authentication.createToken(createdUser);
      res
        .status(201)
        .json({
          token,
          status: 'success',
          fullname,
          data: createdUser,
          id: createdUser.id,
          message: 'Inserted a new user'
        });
    } catch (err) {
      res.status(400).json({ error: err });
    }
  }
}

export default UserController;
