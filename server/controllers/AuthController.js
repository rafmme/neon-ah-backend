import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import authQuery from '../lib/authModelQuery';
import config from '../config/config';

const Auth = {
  /**
   * Login a user
   * @param {object} req
   * @param {object} res
   * @returns {object} user object
   */
  async logIn(req, res) {
    const { email, password } = req.body;

    try {
      const user = await authQuery.findUser(email);

      if (!user) return res.status(404).json({ message: 'user not found' });

      const passwordTrue = bcrypt.compareSync(
        password,
        user.dataValues.password
      );
      if (!passwordTrue) {
        return res
          .status(401)
          .json({ auth: false, token: null, message: 'Password is wrong' });
      }

      const payload = {
        id: user.id,
        userName: user.username,
        role: user.role
      };
      // Create JWT Payload
      // Sign Token
      jwt.sign(
        payload,
        config.JWT_SECRET,
        { expiresIn: 10800 },
        (err, token) => {
          res.json({
            token: `${token}`,
            userName: `${user.username}`,
            userId: `${user.id}`,
            userPriviledge: `${user.userpriviledge}`
          });
        }
      );
    } catch (error) {
      return res.status(400).json(error);
    }
  }
};

export default Auth;
