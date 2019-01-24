import db from '../models';
import response from '../helpers/response';

const { User, Follow } = db;

/**
 *
 *
 * @class followContoller
 */
class followContoller {
  /**
   *
   * @description Method to follow user
   * @static
   * @param {*} req
   * @param {*} res
   * @returns {object} Json response
   * @memberof followContoller
   */
  static async followUser(req, res) {
    try {
      const { userName } = req.params;
      const user = await User.findOne({
        where: {
          userName
        }
      });

      if (!user) {
        return response(res, 404, 'failure', 'User not found');
      }

      const userId = user.id;
      const followersId = req.user.userId;

      if (user.id === req.user.userId) {
        return response(res, 400, 'failure', 'You cannot follow yourself');
      }

      Follow.findOrCreate({
        where: { userId, followersId },
        attributes: ['id', 'followersId', 'userId']
      }).spread((follow, created) => {
        if (created) {
          return response(
            res,
            201,
            'success',
            `You are now following ${user.userName}`
          );
        }
        return response(
          res,
          400,
          'failure',
          `You are already following ${user.userName}`
        );
      });
    } catch (error) {
      response(res, 500, 'failure', error.name);
    }
  }

  /**
   *
   * @description Method to unfollow user
   * @static
   * @param {*} req
   * @param {*} res
   * @returns {object} Json response
   * @memberof followContoller
   */
  static async unfollowUser(req, res) {
    try {
      const { userName } = req.params;

      const user = await User.findOne({
        where: {
          userName
        }
      });

      if (!user) {
        return response(res, 404, 'failure', 'User not found');
      }

      const userId = user.id;

      const followersId = req.user.userId;

      if (user.id === req.user.userId) {
        return response(res, 400, 'failure', 'You cannot unfollow yourself');
      }

      const userUnfollow = await Follow.findOne({
        where: { userId, followersId }
      });

      if (!userUnfollow) {
        return response(
          res,
          400,
          'failure',
          `You are not following ${user.userName}`
        );
      }

      userUnfollow.destroy();
      response(res, 200, 'success', `You unfollowed ${user.userName}`);
    } catch (error) {
      response(res, 500, 'failure', error.name);
    }
  }

  /**
   *
   * @description Method to get all followers
   * @static
   * @param {*} req
   * @param {*} res
   * @returns {object} Json response
   * @memberof followContoller
   */
  static async getFollowers(req, res) {
    try {
      const { userName } = req.params;
      const user = await User.findOne({
        where: { userName }
      });

      if (!user) {
        return response(res, 404, 'failure', 'User not found');
      }

      const userId = user.dataValues.id;

      const followers = await Follow.findAll({
        where: { userId },
        include: [
          {
            model: User,
            as: 'followingUser',
            attributes: ['id', 'fullName', 'userName', 'img', 'bio']

          }
        ],

      });

      if (followers.length === 0) {
        return response(res, 200, 'success', 'You currenly have no followers');
      }

      const payload = {
        followers: followers.map(follower => follower.followingUser),
        get followCount() {
          return this.followers.length;
        }
      };

      response(
        res,
        200,
        'success',
        'Followers returned successfully',
        null,
        payload
      );
    } catch (error) {
      response(res, 500, 'failure', error.name);
    }
  }

  /**
   *
   * @description Method to get all following
   * @static
   * @param {*} req
   * @param {*} res
   * @returns {object} Json response
   * @memberof followContoller
   */
  static async getFollowing(req, res) {
    try {
      const { userName } = req.params;
      const user = await User.findOne({
        where: { userName }
      });

      if (!user) {
        return response(res, 404, 'failure', 'User not found');
      }

      const userId = user.dataValues.id;

      const following = await Follow.findAll({
        where: { followersId: userId },
        attributes: [],
        include: [
          {
            model: User,
            as: 'followedUser',
            attributes: ['id', 'fullName', 'userName', 'img', 'bio']
          }
        ]
      });

      if (following.length === 0) {
        return response(res, 200, 'success', 'You are not following anyone');
      }
      const payload = {
        following: following.map(followingUser => followingUser.followedUser),
        get followCount() {
          return this.following.length;
        }
      };

      response(
        res,
        200,
        'success',
        'Following returned successfully',
        null,
        payload
      );
    } catch (error) {
      response(res, 500, 'failure', error.name);
    }
  }
}
export default followContoller;
