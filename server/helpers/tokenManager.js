import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();
/**
 * @class tokenManager
 * @description tokenManager class methods
 */
class tokenManager {
  /**
   * @param {object} data - represents the promise object returned from database
   * @returns { token } token - this is the signed token
   * @memberof tokenManager
   */
  static async createToken(data) {
    const token = await jwt.sign(
      { sub: data.id, isAdmin: data.roleId, img: data.img },
      process.env.SECRET,
      {
        expiresIn: 86400
      }
    );
    return token;
  }
}

export default tokenManager;
