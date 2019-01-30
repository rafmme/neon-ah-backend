import db from '../models';
import response from '../helpers/response';
import pagination from '../helpers/pagination';

const { Article, Follow, Tag } = db;

/**
 *
 *
 * @class ArticleFeedContoller
 */
class FollowFeedContoller {
  /**
   *
   * @description Method get multiple articles created by followed users
   * @static
   * @param {*} req
   * @param {*} res
   * @returns {object} Json response
   * @memberof FollowFeedContoller
   */
  static async getFollowingArticles(req, res) {
    try {
      const { query } = req;
      const limit = Number(query.limit) || 20;
      const currentPage = Number(query.page) || 1;
      const offset = (currentPage - 1) * limit;
      const { userId } = req.user;
      const follows = await Follow.findAll({
        where: {
          followersId: userId
        }
      });
      if (follows.length <= 0) {
        return response(res, 404, 'failure', 'Article not found, no author has been followed.');
      }
      follows.map(async (follow) => {
        const findArticles = await Article.findAndCountAll({
          where: {
            userId: follow.dataValues.userId
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
        const articleDataValues = [];
        findArticles.rows.map(article => articleDataValues.push(article.dataValues));
        const totalArticle = findArticles.count;
        const paginatedData = pagination(
          findArticles.rows.length,
          limit,
          currentPage,
          totalArticle
        );
        articleDataValues.map((article) => {
          article.tags = article.tags.map(tag => tag.name);
          return article.tags;
        });
        const data = {
          articles: articleDataValues,
          paginatedData
        };
        return response(res, 200, 'success', 'Article found.', null, data);
      });
    } catch (error) {
      return response(
        res,
        500,
        'failure',
        'server error',
        { message: 'Something went wrong on the server' },
        null
      );
    }
  }
}
export default FollowFeedContoller;
