import bcrypt from 'bcrypt';

/**
 * @class encryptData
 * @description class defines the methods used to encrypt and decrypt passswords.
 */
class encryptData {
  /**
   * @static
   * @param {string} password to be encrpyted
   * @returns {string} - hashed password.
   * @memberof encryptData
   */
  static async encryptPassword(password) {
    const salt = 10;
    try {
      const hashedPassword = await bcrypt.hashSync(password, salt);
      return hashedPassword;
    } catch (err) {
      return Error('An error occured while hashing');
    }
  }

  /**
   * @static
   * @param {string} password - the string to compare
   * @param {string} hashedpassword - hashed password from the database that password is compared against.
   * @returns {boolean} - this is the result of the comparism
   * If the password and the hashed password in the database are the same
   * it returns true, else it returns false.
   * @memberof encryptData
   */
  static async decryptPassword(password, hashedpassword) {
    try {
      const isPasswordValid = await bcrypt.compareSync(password, hashedpassword);
      return isPasswordValid;
    } catch (err) {
      return Error('An error occured while comparing the hashed password.');
    }
  }
}

export default encryptData;
