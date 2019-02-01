import db from '../models';
import response from '../helpers/response';

const {
  Article, FollowedTags, Tag
} = db;

/**
 *
 *
 * @class TagFeedController
 */
class TagFeedController {
  /**
   *
   * @description Method get multiple articles created by followed tag
   * @static
   * @param {*} req
   * @param {*} res
   * @returns {object} Json response
   * @memberof TagFeedController
   */
  static async getFollowingTagArticles(req, res) {
    try {
      const { userId } = req.user;
      const followedtags = await FollowedTags.findAll({
        where: {
          followerId: userId
        }
      });

      if (followedtags.length === 0) {
        return response(res, 404, 'failure', 'You are not following any tags');
      }
      const tagIds = [];
      followedtags.map(tag => tagIds.push(tag.dataValues.tagId));
      const findArticle = await Tag.findAll({
        where: {
          id: tagIds
        },
        include: [
          {
            model: Article,
            as: 'articles',
            attributes: ['id', 'slug', 'title', 'content']
          }
        ]
      });
      response(
        res,
        200,
        'success',
        'Articles under tags returned sucessfully',
        null,
        findArticle
      );
    } catch (error) {
      return response(
        res,
        500,
        'failure',
        'Something went wrong on the server'
      );
    }
  }
}

export default TagFeedController;
