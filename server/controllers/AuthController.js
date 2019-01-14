import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import db from '../models';

const { Users } = db;
/**
 *
 *
 * @class Auth
 */
class Auth {
  /**
   * @static
   * @param {*} req
   * @param {*} res
   * @returns {object} Json response
   * @memberof Auth
   */
  static async logIn(req, res) {
    try {
      const { email, password } = req.body;

      const user = await Users.findOne({ where: { email } });

      if (!user) {
        return res.status(404).json({ message: 'user not found' });
      }

      const isValidPassword = bcrypt.compareSync(
        password,
        user.dataValues.password
      );

      if (!isValidPassword) {
        return res
          .status(401)
          .json({ auth: false, token: null, message: 'Password is wrong' });
      }

      const payload = {
        id: user.id,
        userName: user.username,
        role: user.roleId
      };
      // Create JWT Payload
      // Sign Token
      jwt.sign(
        payload,
        process.env.JWT_SECRET,
        { expiresIn: 10800 },
        (err, token) => {
          res.json({
            token: `${token}`,
            payload
          });
        }
      );
    } catch (error) {
      return res.status(400).json(error);
    }
  }
}

export default Auth;
