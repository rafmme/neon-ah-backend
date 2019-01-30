import db from '../models';
import response from '../helpers/response';
import Util from '../helpers/Util';

const { Bookmark, Article, User } = db;

/**
 * @class BookmarkController
 */
class BookmarkController {
  /**
   * @static
   * @description Method to create or delete bookmarks on an article
   * @param {object} req HTTP request object
   * @param {object} res HTTP response object
   * @returns {object} api route response
   */
  static async createOrRemove(req, res) {
    try {
      const { userId } = req.user;
      const user = await User.findByPk(userId);
      if (!user) return response(res, 404, 'failure', 'User not found');

      const { slug } = req.params;
      const article = await Util.resourceExists(Article, { slug });
      if (!article) return response(res, 404, 'failure', 'Article not found');

      await Bookmark.findOrCreate({
        where: { userId, articleId: article.dataValues.id },
      }).spread((bookmark, created) => {
        if (created) {
          return response(res, 201, 'success', 'You have successfully bookmarked this article', null, bookmark);
        }
        bookmark.destroy();
        return response(res, 200, 'success', 'Bookmark removed successfully');
      });
    } catch (error) {
      return response(res, 500, 'failure', 'Something went wrong on the server', `server error: ${error.message}`);
    }
  }

  /**
   * @static
   * @description Method to handle fetching of all bookmarks of an article
   * @param {object} req HTTP request object
   * @param {object} res HTTP response object
   * @returns {object} api route response with the bookmarks
   */
  static async getArticleBookmarks(req, res) {
    try {
      const { userId } = req.user;
      const user = await User.findByPk(userId);
      if (!user) return response(res, 404, 'failure', 'User not found');

      const { slug } = req.params;
      const article = await Util.resourceExists(Article, { slug });
      if (!article) return response(res, 404, 'failure', 'Article not found');

      const bookmarksQuery = await Bookmark.findAll({
        attributes: { exclude: ['userId'] },
        include: [{
          model: User,
          attributes: ['userName', 'bio', 'img']
        }],
        where: {
          articleId: article.dataValues.id
        },
      });
      if (bookmarksQuery.length === 0) {
        return response(res, 200, 'success', 'This article has not been bookmarked yet');
      }
      const bookmarks = [];
      bookmarksQuery.map(bookmark => bookmarks.push(bookmark.dataValues));
      return response(res, 200, 'success', 'Bookmarks successfully found', null, { bookmarks, bookmarkCount: bookmarks.length });
    } catch (error) {
      return response(res, 500, 'failure', 'Something went wrong on the server', `server error: ${error.message}`);
    }
  }

  /**
   * @static
   * @description Method to handle fetching of a single user's bookmarks
   * @param {object} req HTTP request object
   * @param {object} res HTTP response object
   * @returns {object} api route response with the bookmarks
   */
  static async getUserBookmarks(req, res) {
    try {
      const { userId } = req.user;
      const user = await User.findByPk(userId);
      if (!user) return response(res, 404, 'failure', 'User not found');

      const bookmarksQuery = await Bookmark.findAll({
        where: {
          userId: user.dataValues.id
        },
      });
      if (bookmarksQuery.length === 0) {
        return response(res, 200, 'success', 'You have not bookmarked any article yet');
      }
      const bookmarks = [];
      bookmarksQuery.map(bookmark => bookmarks.push(bookmark.dataValues));
      return response(res, 200, 'success', 'Bookmarks successfully found', null, { bookmarks, bookmarkCount: bookmarks.length });
    } catch (error) {
      return response(res, 500, 'failure', 'Something went wrong on the server', `server error: ${error.message}`);
    }
  }
}
export default BookmarkController;
