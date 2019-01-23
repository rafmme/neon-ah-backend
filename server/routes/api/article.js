import { Router } from 'express';
import ArticleController from '../../controllers/ArticleController';
import ArticleValidation from '../../middlewares/validations/ArticleValidation';
import AuthMiddleware from '../../middlewares/AuthMiddleware';

const articleRoutes = Router();

articleRoutes.post(
  '/articles',
  AuthMiddleware.checkIfUserIsAuthenticated,
  AuthMiddleware.checkUserVerification,
  ArticleValidation.validateArticleData,
  ArticleValidation.sanitizeArticleContent,
  ArticleValidation.checkIfArticleExist,
  ArticleController.create
);
articleRoutes.get('/articles', ArticleController.fetchAll);
articleRoutes.get('/articles/:slug', ArticleController.fetchOne);
articleRoutes.put(
  '/articles/:slug',
  AuthMiddleware.checkIfUserIsAuthenticated,
  ArticleValidation.verifyUserOwnStory,
  ArticleValidation.constructArticleUpdateData,
  ArticleValidation.validateArticleData,
  ArticleController.update
);
articleRoutes.delete(
  '/articles/:slug',
  AuthMiddleware.checkIfUserIsAuthenticated,
  ArticleValidation.verifyUserOwnStory,
  ArticleController.remove
);

export default articleRoutes;
