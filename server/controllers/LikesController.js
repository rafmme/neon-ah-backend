import db from '../models';
import response from '../helpers/response';

const {
  Article, ArticleLikesDislike, User, Comment, CommentLike
} = db;

/**
 * @class LikesDislikeController
 */
class LikesController {
  /**
   * @description Method to like and unlike an article
   * @static
   * @param {*} req Request parameter
   * @param {*} res Response parameter
   * @returns {object} Json response
   * @memberof LikesDislikeController
   */
  static async likeArticle(req, res) {
    try {
      const articleSlug = req.params;
      const theArticleSlug = JSON.stringify(articleSlug).split('"')[3];
      const theArticle = await Article.findOne({
        where: { slug: theArticleSlug }
      });

      if (!theArticle) {
        return response(res, 404, 'failure', 'Article Not Found', null, null);
      }

      const unlikeTheArticle = await ArticleLikesDislike.findOne({
        where: {
          userId: req.user.userId,
          articleId: theArticle.dataValues.id,
          reaction: 'like'
        }
      });

      if (unlikeTheArticle) {
        await ArticleLikesDislike.destroy({
          where: {
            userId: req.user.userId,
            articleId: theArticle.dataValues.id,
            reaction: 'like'
          }
        });
        return response(res, 200, 'success', 'You just unliked this article!', null, null);
      }

      const likeTheArticle = await ArticleLikesDislike.create({
        userId: req.user.userId,
        articleId: theArticle.dataValues.id,
        reaction: 'like'
      });

      if (likeTheArticle) {
        return response(res, 200, 'success', 'You just liked this article!', null, null);
      }
    } catch (error) {
      return response(res, 401, 'failure', error, null, null);
    }
  }

  /**
   * @description Method to get all likes for an article
   * @static
   * @param {*} req Request parameter
   * @param {*} res Response parameter
   * @returns {object} Json response
   * @memberof LikesDislikeController
   */
  static async articleLikes(req, res) {
    try {
      const articleSlug = req.params;
      const theArticleSlug = JSON.stringify(articleSlug).split('"')[3];
      const theArticle = await Article.findOne({
        where: { slug: theArticleSlug }
      });

      if (!theArticle) {
        return response(res, 404, 'failure', 'Article Not Found!', null, null);
      }
      const allLikes = await ArticleLikesDislike.findAndCountAll({
        where: {
          articleId: theArticle.dataValues.id,
          reaction: 'like'
        },
        include: [
          {
            model: User,
            as: 'Liked By',
            attributes: ['id', 'userName', 'img'],
          }
        ],
        attributes: [
        ]
      });
      if (!allLikes) {
        return response(res, 404, 'failure', 'No likes for this Article', null, null);
      }
      return response(res, 200, 'success', `There are ${allLikes.count} Likes for this article`, null, allLikes.rows);
    } catch (error) {
      return res.status(401).json({
        data: { status: 'failure', message: error }
      });
    }
  }


  /**
   *
   * @description Method to likes and unlike a comment
   * @static
   * @param {*} req
   * @param {*} res
   * @returns {object} Json response
   * @memberof LikesController
   */
  static async likeComment(req, res) {
    try {
      const { commentId } = req.params;
      const { userId } = req.user;
      const commentFound = await Comment.findOne({
        where: {
          id: commentId
        },
        attributes: {
          exclude: ['commentId']
        }
      });
      if (!commentFound) {
        return response(res, 404, 'failure', 'Comment not found', null, null);
      }

      const unlikeTheComment = await CommentLike.findOne({
        where: {
          userId,
          commentId
        }
      });

      if (unlikeTheComment) {
        await CommentLike.destroy({
          where: {
            userId,
            commentId
          }
        });
        return response(res, 200, 'success', 'You just unliked this comment', null, null);
      }

      const likeTheComment = await CommentLike.create({
        userId,
        commentId,
        reaction: 'like'
      });

      if (likeTheComment) {
        return response(res, 200, 'success', 'You just liked this comment', null, null);
      }
    } catch (error) {
      return response(res, 500, 'failure', 'An error occured on the server', null, null);
    }
  }

  /**
   *
   * @description Method to get all likes for a comment
   * @static
   * @param {*} req
   * @param {*} res
   * @returns {object} Json response
   * @memberof LikesController
   */
  static async commentLikes(req, res) {
    const { commentId } = req.params;
    const commentFound = await Comment.findOne({
      where: {
        id: commentId
      },
      attributes: {
        exclude: ['commentId']
      }
    });
    if (!commentFound) {
      return response(res, 404, 'failure', 'Comment not foundd', null, null);
    }

    const allLikes = await CommentLike.findAndCountAll({
      where: {
        commentId
      }
    });
    const commentLikesCount = allLikes.count;
    if (allLikes.count === 0) {
      return response(res, 404, 'failure', 'No likes for this comment', null, {
        commentLikesCount
      });
    }
    return response(
      res,
      200,
      'success',
      `There are ${allLikes.count} Likes for this comment`,
      null,
      { commentLikesCount }
    );
  }
}
export default LikesController;
