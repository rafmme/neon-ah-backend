import models from '../models/index';

const { User } = models;
/**
 *
 *
 * @class UserModelQuery
 */
class authQuery {
  /**
   * @param {stirng} email email must be type string
   * @return {object} return user if it exist or null if it doesn't.
   */
  static async findUser(email) {
    try {
      const emailUser = await User.findOne({
        where: { email }
      });
      if (emailUser) {
        console.log('authQuery', emailUser);
        return emailUser;
      }
      return null;
    } catch (e) {
      throw new Error('Something went wrong', e);
    }
  }
}
export default authQuery;
