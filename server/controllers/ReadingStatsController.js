import db from '../models';
import response from '../helpers/response';

const { Article, ReadingStats } = db;

/**
 *
 * @class ReadingStatsController
 */
class ReadingStatsController {
  /**
   *
   * @description Method to get user reading stats
   * @static
   * @param {*} req
   * @param {*} res
   * @returns {object} Json response
   * @memberof ReadingStatsController
   */
  static async getReadingStats(req, res) {
    try {
      const { userId } = req.user;
      const userStats = await ReadingStats.findAndCountAll({
        where: {
          userId
        },
        include: [
          {
            model: Article,
            attributes: ['slug', 'title', 'content', 'banner']
          }
        ]
      });

      if (userStats.count === 0) {
        return response(
          res,
          404,
          'failure',
          "You currently don't have any reading stats"
        );
      }
      const payload = {
        readStats: userStats.rows,
        readStatsCount: userStats.count
      };
      return response(res, 200, 'success', 'ReadingStats', null, payload);
    } catch (error) {
      return response(
        res,
        500,
        'failure',
        'Something went wrong on the server',
        null,
        null
      );
    }
  }

  /**
   *
   * @description Method to create user reading stats
   * @static
   * @param {*} req
   * @param {*} res
   * @returns {object} Json response
   * @memberof ReadingStatsController
   */
  static async createReadingStats(req, res) {
    try {
      const { userId } = req.user;
      const articleSlug = req.params;
      const theArticleSlug = JSON.stringify(articleSlug).split('"')[3];
      const theArticle = await Article.findOne({
        where: { slug: theArticleSlug }
      });
      const articleId = theArticle.dataValues.id;

      ReadingStats.findOrCreate({
        where: { userId, articleId },
        attributes: ['id', 'articleId', 'userId']
      }).spread((stats, created) => {
        if (created) {
          return stats;
        }
      });
    } catch (error) {
      return response(
        res,
        500,
        'failure',
        'Something went wrong on the server',
        null,
        null
      );
    }
  }
}
export default ReadingStatsController;
