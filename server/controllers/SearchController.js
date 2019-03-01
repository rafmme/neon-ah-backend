import Sequelize from 'sequelize';
import response from '../helpers/response';
import db from '../models';
import pagination from '../helpers/pagination';

const { User, Tag, Article } = db;
const { Op } = Sequelize;
/**
 * @class SearchController
 */
class SearchController {
  /**
   * @static
   * @description a function that handles searching articles by author
   * @param {String} keyword
   * @param {object} req HTTP request object
   * @param {object} res HTTP response object
   * @returns {object} api route response with created article info
   */
  static async keyword(keyword, req, res) {
    try {
      const findAuthorPromise = User.findAndCountAll({
        where: {
          [Op.or]: [
            {
              userName: {
                [Op.iLike]: `%${keyword}%`
              }
            },
            {
              fullName: {
                [Op.iLike]: `%${keyword}%`
              }
            }
          ]
        },
        attributes: ['id', 'userName', 'fullName', 'bio', 'img']
      });
      const findTagPromise = Tag.findAndCountAll({
        where: {
          name: {
            [Op.iLike]: `%${keyword}%`
          }
        },
        attributes: ['id', 'name'],
        include: [
          {
            model: Article,
            as: 'articles',
            attributes: ['id', 'slug', 'title', 'content'],
            through: {
              attributes: []
            }
          }
        ]
      });
      const findArticlesPromise = Article.findAndCountAll({
        where: {
          title: {
            [Op.iLike]: `%${keyword}%`
          }
        },
        attributes: { exclude: ['userId'] },
        include: [
          {
            model: User,
            as: 'author',
            attributes: ['userName', 'bio', 'img']
          }
        ]
      });
      const [articles, authors, tags] = await Promise.all([
        findArticlesPromise,
        findAuthorPromise,
        findTagPromise
      ]);
      return response(res, 200, 'success', 'Author found', null, { articles, authors, tags });
    } catch (error) {
      return response(res, 500, 'failure', 'Something went wrong on the server', null, null);
    }
  }
}

export default SearchController;
