import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();
/**
 * @class Authentication
 * @description Authentication class methods
 */
class authentication {
  /**
   * @param {object} data - represents the promise object returned from database
   * @returns { token } token - this is the signed token
   * @memberof Authentication
   */
  static async createToken(data) {
    const token = await jwt.sign({ sub: data.id, isAdmin: data.roleid }, process.env.SECRET, {
      expiresIn: 86400
    });
    return token;
  }
}

export default authentication;
