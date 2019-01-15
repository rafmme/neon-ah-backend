import TokenManager from '../helpers/TokenManager';
import PasswordManager from '../helpers/PasswordManager';
import db from '../models';

const { Users } = db;
/**
 *
 *
 * @class Auth
 */
class UserController {
  // /**
  //  * @static
  //  * @param {*} req
  //  * @param {*} res
  //  * @returns {object} Json response
  //  * @memberof Auth
  //  */
  // static async signUp(req, res) {
  //   try {
  //     const { fullname, username, email, password } = req.body;
  //     const user = await Users.findOne({ where: { email } });

  //     if (user) {
  //       return res.status(404).json({ message: 'User already exist' });
  //     }

  //     const salt = bcrypt.genSaltSync(10);
  //     const hashedPassword = bcrypt.hashSync(password, salt);

  //     const storedData = await Users.create({
  //       fullname,
  //       username,
  //       email,
  //       password: hashedPassword,
  //       roleId: 3,
  //       authTypeId: 0
  //     });
  //     const payload = {
  //       id: storedData.id,
  //       roleId: storedData.roleId,
  //       username: storedData.username,
  //       email: storedData.email
  //     };
  //     const token = getToken(payload);
  //     return res.json({
  //       token: `${token}`
  //     });
  //   } catch (err) {
  //     return res.status(400).json(err);
  //   }
  // }

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
        return res
          .status(404)
          .send({ status: 'failure', data: { message: 'User not found' } });
      }

      const isValidPassword = PasswordManager.decryptPassword(
        password,
        user.dataValues.password
      );

      if (!isValidPassword) {
        return res.status(401).send({
          status: 'failure',
          data: { auth: false, token: null, message: 'Password is wrong' }
        });
      }

      const payload = {
        id: user.id,
        userName: user.username,
        role: user.roleId
      };
      const token = TokenManager.sign(payload, '24h');
      return res.status(200).send({
        status: 'success',
        data: { token: `${token}` }
      });
    } catch (error) {
      return res.status(400).send(error);
    }
  }
}

export default UserController;
