import Sequelize from 'sequelize';
import response from '../helpers/response';
import db from '../models';


const { User } = db;
const { Op } = Sequelize;
/**
 * @class SearchController
 */
class SearchController {
/**
 * @static
 * @description a function that handles searching articles by author
 * @param {String} author
 * @param {object} res HTTP response object
 * @returns {object} api route response with created article info
 */
  static async byAuthor(author, res) {
    try {
      const findAuthor = await User.findAll({
        where: {
          [Op.or]: [
            {
              userName: {
                [Op.like]: `%${author}%`
              }
            },
            {
              fullName: {
                [Op.like]: `%${author}%`
              }
            }
          ]
        },
        attributes: ['userName', 'fullName', 'bio', 'img']
      });
      if (findAuthor.length > 0) {
        return response(res, 200, 'success', 'Author found', null, findAuthor);
      }
      return response(res, 404, 'failure', 'Arthor not found', null, null);
    } catch (error) {
      return response(res, 500, 'failure', 'Something went wrong on the server', null, null);
    }
  }
}


export default SearchController;
