import db from '../models';
import response from '../helpers/response';

const { Article, Report, User } = db;

/**
 *
 *
 * @class ReportArticleController
 */
class ReportArticleController {
  /**
   * @descripion Allow users to report articles that violate terms and agreement
   * @static
   * @param {*}req Express Request Object
   * @param {*}res Express Response object
   * @returns {object} Json response
   * @memberof ReportArticleController
   */
  static async reportArticle(req, res) {
    try {
      const { userId } = req.user;
      const { complaint } = req.body;
      const { slug } = req.params;

      const getArticle = await Article.findOne({
        where: {
          slug
        }
      });
      if (!getArticle) {
        return response(res, 404, 'failure', 'Article not found', null, null);
      }
      if (userId === getArticle.dataValues.userId) {
        return response(
          res,
          403,
          'failure',
          'You cannot report your own article. Do you want to Delete the article?',
          null,
          null
        );
      }
      const reported = await Report.findOne({
        where: {
          articleId: getArticle.dataValues.id,
          userId
        }
      });

      if (reported) {
        return response(
          res,
          403,
          'failed',
          'You just reported this article! Do you wish to cancel the report or modify your complaint?',
          null,
          null
        );
      }
      const submitReport = await Report.create({
        userId,
        articleId: getArticle.dataValues.id,
        complaint
      });
      if (submitReport) {
        return response(
          res,
          201,
          'success',
          'Your report has been logged and will be acted on',
          null,
          null
        );
      }
    } catch (error) {
      return response(res, 500, 'failure', 'server error', { message: error }, null);
    }
  }

  /**
   *
   * @description Gets all reported articles
   * @static
   * @param {*} req
   * @param {*} res
   * @returns {object} Json response
   * @memberof ReportArticleController
   */
  static async getReportedArticles(req, res) {
    try {
      const allReportedArticle = await Report.findAndCountAll({
        include: [
          {
            model: Article,
            attributes: ['title', 'userId']
          },
          {
            model: User,
            attributes: ['userName', 'img']
          }
        ],
        attributes: ['complaint']
      });

      return response(
        res,
        200,
        'success',
        `There are ${allReportedArticle.count} reported articles`,
        null,
        allReportedArticle.rows
      );
    } catch (error) {
      return response(res, 500, 'failure', 'server error', { message: error }, null);
    }
  }

  /**
   *
   * @description Gets all reports for articles
   * @static
   * @param {*} req
   * @param {*} res
   * @returns {object} Json response
   * @memberof ReportArticleController
   */
  static async getReportsOnArticle(req, res) {
    try {
      const { slug } = req.params;

      const getArticle = await Article.findOne({
        where: {
          slug
        }
      });
      if (!getArticle) {
        return response(res, 404, 'failure', 'Article not found', null, null);
      }

      const allReportedArticle = await Report.findAndCountAll({
        include: [
          {
            model: User,
            attributes: ['userName', 'img']
          }
        ],
        attributes: ['complaint'],
        where: {
          articleId: getArticle.dataValues.id
        }
      });

      return response(
        res,
        200,
        'success',
        `There are ${allReportedArticle.count} reports against this articles`,
        null,
        allReportedArticle.rows
      );
    } catch (error) {
      return response(res, 500, 'failure', 'server error', { message: error }, null);
    }
  }
}

export default ReportArticleController;
