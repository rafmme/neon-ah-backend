import Sequelize from 'sequelize';
import response from '../helpers/response';
import db from '../models';
import pagination from '../helpers/pagination';

const {
  User, Tag, Article
} = db;
const { Op } = Sequelize;
/**
 * @class SearchController
 */
class SearchController {
/**
 * @static
 * @description a function that handles searching articles by author
 * @param {String} author
 * @param {object} req HTTP request object
 * @param {object} res HTTP response object
 * @returns {object} api route response with created article info
 */
  static async byAuthor(author, req, res) {
    try {
      const { query } = req;
      const limit = Number(query.limit) || 20;
      const currentPage = Number(query.page) || 1;
      const offset = (currentPage - 1) * limit;
      const findAuthor = await User.findAndCountAll({
        where: {
          [Op.or]: [
            {
              userName: {
                [Op.iLike]: `%${author}%`
              }
            },
            {
              fullName: {
                [Op.iLike]: `%${author}%`
              }
            }
          ]
        },
        attributes: ['id', 'userName', 'fullName', 'bio', 'img'],
        limit,
        offset
      });
      const totalAuthor = findAuthor.count;
      const paginatedData = pagination(findAuthor.rows.length, limit, currentPage, totalAuthor);
      const data = {
        authors: findAuthor,
        paginatedData
      };
      if (totalAuthor > 0) {
        return response(res, 200, 'success', 'Author found', null, data);
      }
      return response(res, 404, 'failure', 'Author not found', null, null);
    } catch (error) {
      return response(res, 500, 'failure', 'Something went wrong on the server', null, null);
    }
  }

  /**
 * @static
 * @description a function that handles searching articles by author
 * @param {String} tag
 * @param {object} req HTTP request object
 * @param {object} res HTTP response object
 * @returns {object} api route response with created article info
 */
  static async byTags(tag, req, res) {
    try {
      const { query } = req;
      const limit = Number(query.limit) || 20;
      const currentPage = Number(query.page) || 1;
      const offset = (currentPage - 1) * limit;
      const findTag = await Tag.findAndCountAll({
        where: {
          name: {
            [Op.iLike]: `%${tag}%`
          }
        },
        attributes: ['id', 'name'],
        include:
          [{
            model: Article,
            as: 'articles',
            attributes: ['id', 'slug', 'title', 'content'],
            through: {
              attributes: []
            }
          }],
        limit,
        offset
      });
      const totalTag = findTag.count;
      const paginatedData = pagination(findTag.rows.length, limit, currentPage, totalTag);
      const data = {
        tags: findTag,
        paginatedData
      };
      if (totalTag > 0) {
        return response(res, 200, 'success', 'Tag found', null, data);
      }
      return response(res, 404, 'failure', 'Tag not found', null, null);
    } catch (error) {
      return response(res, 500, 'failure', 'Something went wrong on the server', null, error);
    }
  }

  /**
 * @static
 * @description a function that handles searching articles by author
 * @param {String} title
 * @param {object} req HTTP request object
 * @param {object} res HTTP response object
 * @returns {object} api route response with created article info
 */
  static async byTitle(title, req, res) {
    try {
      const { query } = req;
      const limit = Number(query.limit) || 20;
      const currentPage = Number(query.page) || 1;
      const offset = (currentPage - 1) * limit;
      const findArticles = await Article.findAndCountAll({
        where: {
          title: {
            [Op.iLike]: `%${title}%`
          }
        },
        attributes: { exclude: ['userId'] },
        include: [
          {
            model: Tag,
            as: 'tags',
            attributes: ['name'],
            through: { attributes: [] }
          }
        ],
        offset,
        limit
      });

      const totalArticle = findArticles.count;
      const paginatedData = pagination(findArticles.rows.length, limit, currentPage, totalArticle);
      const data = {
        articles: findArticles,
        paginatedData
      };
      if (totalArticle > 0) {
        return response(res, 200, 'success', 'Article found', null, data);
      }
      return response(res, 404, 'failure', 'Article not found', null, null);
    } catch (error) {
      return response(res, 500, 'failure', 'Something went wrong on the server', null, null);
    }
  }
}

export default SearchController;
