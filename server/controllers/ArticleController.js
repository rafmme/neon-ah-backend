import { Sequelize } from 'sequelize';
import db from '../models';
import ArticleHelper from '../helpers/ArticleHelper';
import Util from '../helpers/Util';
import TagHelper from '../helpers/TagHelper';
import response from '../helpers/response';


const { Article, Tag, User } = db;
const { Op } = Sequelize;

/**
 * @class ArticleController
 */
class ArticleController {
  /**
   * @static
   * @description a function that handles addition of new article to the db
   * @param {object} req HTTP request object
   * @param {object} res HTTP response object
   * @returns {object} api route response with created article info
   */
  static async create(req, res) {
    try {
      const { userId } = req.user;
      const {
        title,
        content,
        isPublished,
        banner,
        tagsList,
      } = req.body;
      const tagsArray = tagsList ? Util.createArrayOfStrings(tagsList) : [];

      const articleData = {
        userId,
        slug: ArticleHelper.generateArticleSlug(title),
        title,
        content,
        banner: banner || 'https://unsplash.com/photos/Q7wDdmgCBFg',
        tagsList: tagsArray,
        isPublished: Boolean(isPublished),
        isReported: false,
      };

      let article = await Article.create(articleData);
      article = article.toJSON();
      article.tags = articleData.tagsList;
      const { createdAt, updatedAt } = article;

      await TagHelper.findOrAddTag(article.id, tagsArray);
      article.createdAt = Util.formatDate(createdAt);
      article.updatedAt = Util.formatDate(updatedAt);
      return response(
        res, 201, 'success',
        'New article has been successfully created',
        null, article
      );
    } catch (error) {
      return response(
        res, 500, 'failure',
        'server error',
        { message: 'Something went wrong on the server' }
      );
    }
  }


  /**
   * @static
   * @description this handles fetching of all available/published articles
   * @param {object} req HTTP request object
   * @param {object} res HTTP response object
   * @returns {object} api route response with the articles
   */
  static async fetchAll(req, res) {
    try {
      let articles = await Article.findAll({
        where: { isPublished: true },
        attributes: { exclude: ['userId'] },
        include: [{
          model: User,
          as: 'author',
          attributes: ['userName', 'bio', 'img'],
        },
        {
          model: Tag,
          as: 'tags',
          attributes: ['name'],
          through: { attributes: [] }
        },
        ]
      });

      if (articles && articles.length > 0) {
        articles = articles.map((article) => {
          article = article.toJSON();
          article.tags = article.tags.map(tag => tag.name);
          article.createdAt = Util.formatDate(article.createdAt);
          article.updatedAt = Util.formatDate(article.updatedAt);
          return article;
        });
        const data = {
          articles,
          articlesCount: articles.length,
        };
        return response(res, 200, 'success', 'All articles', null, data);
      }
      return response(res, 200, 'success', 'All articles', null, {
        message: 'No articles posted yet'
      });
    } catch (error) {
      return response(
        res, 500, 'failure',
        'server error',
        { message: 'Something went wrong on the server' }
      );
    }
  }

  /**
   * @static
   * @description this handles fetching of a particular article
   * @param {object} req HTTP request object
   * @param {object} res HTTP response object
   * @returns {object} api route response with the article
   */
  static async fetchOne(req, res) {
    try {
      const { slug } = req.params;
      const userId = req.user !== undefined ? req.user.userId : null;

      let article = await Article.findOne({
        where: {
          slug,
          [Op.or]: [{ isPublished: true }, { userId }],
        },
        attributes: { exclude: ['userId'] },
        include: [{
          model: User,
          as: 'author',
          attributes: ['userName', 'bio', 'img'],
        },
        {
          model: Tag,
          as: 'tags',
          attributes: ['name'],
          through: { attributes: [] }
        },
        ]
      });
      if (article) {
        article = article.toJSON();
        const tags = article.tags.map(tag => tag.name);
        article.tags = tags;
        article.createdAt = Util.formatDate(article.createdAt);
        article.updatedAt = Util.formatDate(article.updatedAt);

        return response(
          res, 200, 'success',
          'Article was fetched successfully',
          null, article
        );
      }
      return response(
        res, 404, 'failure',
        'not found error',
        { message: 'Article not found' }
      );
    } catch (error) {
      console.log(error);
      return response(
        res, 500, 'failure',
        'server error',
        { message: 'Something went wrong on the server' }
      );
    }
  }

  /**
   * @static
   * @description this handles the updating of an article
   * @param {object} req HTTP request object
   * @param {object} res HTTP response object
   * @returns {object} api route response with the new article info
   */
  static async update(req, res) {
    try {
      const { userId } = req.user;
      const { slug } = req.params;
      const result = await Article.findOne({
        where: { slug, userId }
      });
      if (result) {
        const articleSlug = result.title.toLowerCase() === req.body.title.toLowerCase()
          ? result.slug : ArticleHelper.generateArticleSlug(req.body.title);

        req.body.slug = articleSlug;
        let article = await result.update(req.body, { fields: Object.keys(req.body) });
        article = article.toJSON();
        article.createdAt = Util.formatDate(article.createdAt);
        article.updatedAt = Util.formatDate(article.updatedAt);
        return response(
          res, 200, 'success',
          'Article was updated successfully',
          null, article
        );
      }
    } catch (error) {
      return response(
        res, 500, 'failure',
        'server error',
        { message: 'Something went wrong on the server' }
      );
    }
  }

  /**
   * @static
   * @description this handles deletion of an article
   * @param {object} req HTTP request object
   * @param {object} res HTTP response object
   * @returns {object} api route response
   */
  static async remove(req, res) {
    try {
      const { userId } = req.user;
      const { slug } = req.params;
      const article = await Article.findOne({
        where: { slug, userId }
      });
      if (article) {
        await article.destroy();
        return response(
          res, 200, 'success',
          'Article was deleted successfully'
        );
      }
    } catch (error) {
      return response(
        res, 500, 'failure',
        'server error',
        { message: 'Something went wrong on the server' }
      );
    }
  }

  /**
   * @static
   * @description this handles fetching of a particular articles for a user
   * @param {object} req HTTP request object
   * @param {object} res HTTP response object
   * @returns {object} api route response with the articles
   */
  static async fetchAllUserArticles(req, res) {
    try {
      const { userId } = req.user;
      const { tag, drafts, published } = req.query;

      let articles = await Article.findAll({
        where: { userId },
        attributes: { exclude: ['userId'] },
        include: [{
          model: User,
          as: 'author',
          attributes: ['userName', 'bio', 'img'],
        },
        {
          model: Tag,
          as: 'tags',
          attributes: ['name'],
          through: { attributes: [] }
        },
        ]
      });

      if (articles && articles.length > 0) {
        articles = articles.map((article) => {
          article = article.toJSON();
          article.tags = article.tags.map(articleTag => articleTag.name);
          article.createdAt = Util.formatDate(article.createdAt);
          article.updatedAt = Util.formatDate(article.updatedAt);
          return article;
        });
        if (tag) {
          articles = ArticleHelper.filterAuthorArticle(articles, 'tag', tag);
        } else if (drafts === '') {
          articles = ArticleHelper.filterAuthorArticle(articles, 'drafts');
        } else if (published === '') {
          articles = ArticleHelper.filterAuthorArticle(articles, 'published');
        }

        const data = {
          articles,
          articlesCount: articles.length,
        };
        return response(res, 200, 'success', 'All User articles', null, data);
      }
      return response(res, 200, 'success', 'All User articles', null, {
        message: 'You have no articles yet'
      });
    } catch (error) {
      return response(
        res, 500, 'failure',
        'server error',
        { message: 'Something went wrong on the server' }
      );
    }
  }
}

export default ArticleController;
