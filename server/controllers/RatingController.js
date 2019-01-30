import db from '../models';
import response from '../helpers/response';
import Util from '../helpers/Util';

const { Rating, Article, User } = db;

/**
 * @class RatingController
 */
class RatingController {
  /**
   *
   * @description Method to create ratings.
   * @static
   * @param {object} req Express Request object
   * @param {object} res Express Response object
   * @returns {object} Json response
   * @memberof RatingController
   */

  /**
   * @static
   * @description Method to handle fetching of all ratings of an article
   * @param {object} req HTTP request object
   * @param {object} res HTTP response object
   * @returns {object} api route response with the ratings
   */
  static async getArticleRatings(req, res) {
    try {
      const { userId } = req.user;
      const user = await User.findByPk(userId);
      if (!user) return response(res, 404, 'failure', 'User not found');

      const { slug } = req.params;
      const article = await Util.resourceExists(Article, { slug });
      if (!article) return response(res, 404, 'failure', 'Article not found');

      const ratingsQuery = await Rating.findAll({
        include: [{
          model: User,
          as: 'rater',
          attributes: ['userName', 'bio']
        }],
        where: {
          articleId: article.dataValues.id
        },
      });

      if (ratingsQuery.length === 0) {
        return response(res, 200, 'success', 'This article has not been rated');
      }
      const ratings = [];
      ratingsQuery.map(rating => ratings.push(rating.dataValues));
      return response(res, 200, 'success', 'Ratings successfully found', null, {
        ratings,
        ratingsCount: ratings.length
      });
    } catch (error) {
      return response(res, 500, 'failure', 'Something went wrong on the server', `server error: ${error.message}`);
    }
  }

  /**
   * @static
   * @description Method to handle fetching of a single user's ratings
   * @param {object} req HTTP request object
   * @param {object} res HTTP response object
   * @returns {object} api route response with the ratings
   */
  static async getUserRatings(req, res) {
    try {
      const { userId } = req.user;
      const user = await User.findByPk(userId);
      if (!user) return response(res, 404, 'failure', 'User not found');


      const ratingsQuery = await Rating.findAll({
        where: {
          userId
        },
      });
      if (ratingsQuery.length === 0) {
        return response(res, 200, 'success', 'You have not rated any article yet');
      }
      const ratings = [];
      ratingsQuery.map(rating => ratings.push(rating.dataValues));
      return response(res, 200, 'success', 'Ratings successfully found', null, {
        ratings,
        ratingsCount: ratings.length
      });
    } catch (error) {
      return response(res, 500, 'failure', 'Something went wrong on the server', `server error: ${error.message}`);
    }
  }

  /**
   * @static
   * @description Method to Update a single user's ratings
   * @param {object} req HTTP request object
   * @param {object} res HTTP response object
   * @returns {object} api route response with the ratings
   */
  static async updateOrCreate(req, res) {
    try {
      const { userId } = req.user;
      const user = await User.findByPk(userId);
      if (!user) return response(res, 404, 'failure', 'User not found');

      const { slug } = req.params;
      const { rating } = req.body;

      const article = await Util.resourceExists(Article, { slug });
      if (!article) return response(res, 404, 'failure', 'Article not found');

      if (!rating) return response(res, 400, 'failure', 'Please provide a rating');
      // eslint-disable-next-line no-restricted-globals
      if (!Number.isSafeInteger(parseInt(rating, 10)) || isNaN(rating) || rating.toString().trim() === '' || rating < 1 || rating > 5) {
        return response(res, 400, 'failure', 'Rating should be between 1 and 5');
      }

      const rated = await Util.resourceExists(Rating, {
        articleId: article.dataValues.id,
        userId
      });
      if (!rated) {
        if (article.dataValues.userId === userId) return response(res, 403, 'failure', 'You cannot rate your own article');
        const rate = await Rating.create({
          rating: Number(rating),
          articleId: article.dataValues.id,
          userId
        });
        return response(res, 201, 'success', 'You have successfully rated this article', null, rate.dataValues);
      }

      const previousRating = rated.dataValues.rating;
      if (previousRating === Number(rating)) {
        return response(res, 200, 'success', 'You did not update the rating');
      }
      const newRating = await rated.update({
        rating: Number(rating)
      });
      const { articleId, createdAt, updatedAt } = newRating.dataValues;
      return response(
        res, 200, 'success', 'You have successfully updated your rating', null,
        {
          previousRating, currentRating: Number(rating), articleId, userId, createdAt, updatedAt
        }
      );
    } catch (error) {
      return response(res, 500, 'failure', 'Something went wrong on the server', `server error: ${error.message}`);
    }
  }

  /**
   * @static
   * @description Method to delete a user's rating
   * @param {object} req HTTP request object
   * @param {object} res HTTP response object
   * @returns {object} api route response
   */
  static async delete(req, res) {
    try {
      const { userId } = req.user;
      const { slug } = req.params;

      const article = await Util.resourceExists(Article, { slug });
      if (!article) return response(res, 404, 'failure', 'Article not found');

      const rated = await Util.resourceExists(Rating, {
        articleId: article.dataValues.id,
        userId
      });
      if (!rated) return response(res, 404, 'failure', 'Rating not found');

      await rated.destroy();
      return response(res, 200, 'success', 'Rating deleted successfully');
    } catch (error) {
      return response(res, 500, 'failure', 'Something went wrong on the server', `server error: ${error.message}`);
    }
  }
}

export default RatingController;
