import bcrypt from 'bcryptjs';

/**
 * @class PasswordManager
 */
class PasswordManager {
  /**
   * @description Helper method to hash passwords
   * @static
   * @param {string} password
   * @returns {string} A string representing the hashed password
   * @memberof PasswordManager
   */
  static hashPassword(password) {
    return bcrypt.hashSync(password, 10);
  }
}

export default PasswordManager;
