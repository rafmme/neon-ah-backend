import db from '../models';
import response from '../helpers/response';


const { FollowedTags, Tag } = db;

/**
 * @class TagController
 */
class TagController {
  /**
   * @static
   * @description a function that handles following of a tag by user
   * @param {object} req HTTP request object
   * @param {object} res HTTP response object
   * @returns {object} api route response
   */
  static async follow(req, res) {
    try {
      const { userId } = req.user;
      const { tagName } = req.params;
      const tag = await Tag.findOne({ where: { name: tagName } });

      if (!tag) {
        return response(res, 404, 'failure', `${tagName} tag does not exist`);
      }

      FollowedTags.findOrCreate({
        where: { tagName, followerId: userId, tagId: tag.id },
        attributes: ['id', 'tagId', 'tagName', 'followerId']
      }).spread((follow, created) => {
        if (created) {
          return response(
            res,
            201,
            'success',
            `You are now following the ${tagName} tag`
          );
        }
        return response(
          res,
          409,
          'failure',
          `You are already following the ${tagName} tag`
        );
      });
    } catch (error) {
      return response(
        res,
        500,
        'failure',
        'Something went wrong on the server'
      );
    }
  }

  /**
   * @static
   * @description a function that handles getting all tags a user is following
   * @param {object} req HTTP request object
   * @param {object} res HTTP response object
   * @returns {object} api route response
   */
  static async getFollowedTags(req, res) {
    try {
      const { userId } = req.user;
      const followedTags = await FollowedTags.findAll({
        where: { followerId: userId },
        attributes: ['tagId', 'tagName']
      });

      if (followedTags.length === 0) {
        return response(res, 200, 'success', 'You are currenly not following any tag');
      }

      response(
        res,
        200,
        'success',
        'Tags you are following',
        null,
        followedTags
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

  /**
   * @static
   * @description a function that handles unfollowing a tag
   * @param {object} req HTTP request object
   * @param {object} res HTTP response object
   * @returns {object} api route response
   */
  static async unFollow(req, res) {
    try {
      const { tagName } = req.params;
      const { userId } = req.user;
      const tag = await Tag.findOne({
        where: { name: tagName }
      });

      if (!tag) {
        return response(res, 404, 'failure', `${tagName} tag does not exist`);
      }

      const followingTag = await FollowedTags.findOne({
        where: { followerId: userId, tagName }
      });

      if (!followingTag) {
        return response(
          res,
          400,
          'failure',
          `You are not following the ${tagName} tag`
        );
      }

      followingTag.destroy();
      response(res, 200, 'success', `You have now unfollowed the ${tagName} tag`);
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

export default TagController;
