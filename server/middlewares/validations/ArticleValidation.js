/* eslint-disable no-useless-escape */
/* eslint-disable no-unused-expressions */
/* eslint-disable prefer-const */

import { Boolify } from 'node-boolify';
import db from '../../models';
import Util from '../../helpers/Util';
import response from '../../helpers/response';

const { Article } = db;
/**
 * @class ArticleValidation
 */
class ArticleValidation {
  /**
   * @static
   * @description a middleware function for validating article data
   * @param {object} req HTTP request object
   * @param {object} res HTTP response object
   * @param {function} next next middleware function
   * @returns {object} returns error message if article is malformed
   */
  static validateArticleData(req, res, next) {
    const { banner } = req.body;
    req.sanitizeBody('title').trim();
    req.sanitizeBody('content').trim();
    req.sanitizeBody('banner').trim();

    req.checkBody(
      'title',
      'Article title missing'
    ).notEmpty().isString();
    req.checkBody(
      'content',
      'Article content is missing'
    ).notEmpty().isString();

    let { hasError, errorMessages } = Util.extractErrorMessages(req.validationErrors());

    if (banner) {
      const imgExtensionPattern = /\.(svg|png|jpg|jpeg|gif)$/g;
      const urlPattern = /^(https?|ftp|torrent|image|irc):\/\/(-\.)?([^\s\/?\.#-]+\.?)+(\/[^\s]*)?$/i;
      req.body.banner = `${banner}`;
      errorMessages.banner = urlPattern.test(banner) || imgExtensionPattern.test(banner) ? undefined : 'banner url is not a valid one';
      errorMessages.banner ? hasError = true : undefined;
    }
    if (hasError === true) {
      return response(res, 400, 'failure', 'Field validation error', errorMessages, null);
    }
    return next();
  }

  /**
   * @static
   * @description a middleware function for validating article data
   * @param {object} req HTTP request object
   * @param {object} res HTTP response object
   * @param {function} next next middleware function
   * @returns {object} returns error message if article is malformed
   */
  static sanitizeArticleContent(req, res, next) {
    const { title, content } = req.body;
    req.body.title = Util.removeExtraWhitespace(title);
    req.body.content = Util.removeExtraWhitespace(content);
    return next();
  }

  /**
   * @static
   * @description a middleware function for checking against duplication of articles
   * @param {object} req HTTP request object
   * @param {object} res HTTP response object
   * @param {function} next next middleware function
   * @returns {object} returns error message if article already exists
   */
  static async checkIfArticleExist(req, res, next) {
    try {
      const { content } = req.body;
      const article = await Article.findOne({ where: { content } });
      if (article === null
        || article.content.toLowerCase() !== content.toLowerCase()) {
        return next();
      }
      return response(
        res, 409, 'failure', 'conflict error',
        { message: 'Oops! there is another article with same content' },
        null
      );
    } catch (error) {
      return response(
        res, 500, 'failure',
        'server error',
        { message: 'Something went wrong on the server' }, null
      );
    }
  }

  /**
   * @static
   * @description a middleware function for verifying if a user is the author of a story
   * before deleting or updating the story
   * @param {object} req HTTP request object
   * @param {object} res HTTP response object
   * @param {function} next next middleware function
   * @returns {object} returns error message if user isn't the owner of an article
   */
  static async verifyUserOwnStory(req, res, next) {
    try {
      const { userId } = req.user;
      const { slug } = req.params;
      const article = await Article.findOne({
        where: {
          slug,
        }
      });
      if (article && article.userId === userId) {
        return next();
      } if (article && article.userId !== userId) {
        return response(
          res, 403, 'failure',
          'authorization error',
          { message: 'You don\'t have permission to perform this action' },
          null
        );
      }
      return response(
        res, 404, 'failure',
        'not found error',
        { message: 'Article not found' }, null
      );
    } catch (error) {
      return response(
        res, 500, 'failure',
        'server error',
        { message: 'Something went wrong on the server' }, null
      );
    }
  }

  /**
   * @static
   * @description a middleware function for constructing article's info for update
   * @param {object} req HTTP request object
   * @param {object} res HTTP response object
   * @param {function} next next middleware function
   * @returns {object} returns to the next middleware function
   */
  static async constructArticleUpdateData(req, res, next) {
    try {
      const { slug } = req.params;
      let article = await Article.findOne({
        where: {
          slug,
        },
      });
      if (article) {
        article = article.toJSON();
        req.body.title = req.body.title
          ? Util.removeExtraWhitespace(req.body.title)
          : article.title;
        req.body.content = req.body.content
          ? Util.removeExtraWhitespace(req.body.content) : article.content;
        req.body.banner = req.body.banner
          ? Util.removeExtraWhitespace(req.body.banner) : article.banner;
        req.body.isPublished = req.body.isPublished !== undefined
          ? Boolify(req.body.isPublished) : article.isPublished;
        req.body.isReported = req.body.isReported !== undefined
          ? Boolify(req.body.isReported) : article.isReported;
        return next();
      }
      return response(
        res, 404, 'failure',
        'not found error',
        { message: 'Article not found' }, null
      );
    } catch (error) {
      return response(
        res, 500, 'failure',
        'server error',
        { message: 'Something went wrong on the server' }, null
      );
    }
  }

  /**
   * @static
   * @description a middleware function for checking if the limit param is an integer
   * @param {*} req HTTP request object
   * @param {*} res HTTP response object
   * @param {function} next next middleware function
   * @returns {object} returns to the next middleware function
   * @memberof ArticleValidation
   */
  static async verifyLimitParams(req, res, next) {
    try {
      const { limit } = req.query;
      if (!limit) {
        return next();
      }
      if (!Number.isSafeInteger(parseInt(limit, 10))) {
        response(res, 400, 'failure', 'There was an issue with your query');
      }
      return next();
    } catch (error) {
      return response(
        res, 500, 'failure',
        'server error',
        {
          message: 'Something went wrong on the server'
        }, null);
    }
  }


  /**
   *
   * @description a middleware function for checking if the page param is an integer
   * @static
   * @param {*} req
   * @param {*} res
   * @param {*} next
   * @returns {object} returns to the next middleware function
   * @memberof ArticleValidation
   */
  static async verifyPageParams(req, res, next) {
    try {
      const { page } = req.query;
      if (!page) {
        return next();
      }
      if (!Number.isSafeInteger(parseInt(page, 10))) {
        response(res, 400, 'failure', 'There was an issue with your query');
      }
      return next();
    } catch (error) {
      return response(
        res, 500, 'failure',
        'server error',
        {
          message: 'Something went wrong on the server'
        }, null);
    }
  }
}

export default ArticleValidation;
