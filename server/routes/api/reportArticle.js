import { Router } from 'express';
import ReportArticleController from '../../controllers/ReportArticleController';
import AuthMiddleware from '../../middlewares/AuthMiddleware';
import handleValidationErrors from '../../middlewares/validations/handleValidationErrors';
import reportArticleSchema from '../../middlewares/validations/ReportArticleValidations';

const reportArticleRoutes = Router();

reportArticleRoutes.post(
  '/articles/:slug/report',
  AuthMiddleware.checkIfUserIsAuthenticated,
  reportArticleSchema,
  handleValidationErrors,
  ReportArticleController.reportArticle
);
reportArticleRoutes.get(
  '/reports',
  AuthMiddleware.checkIfUserIsAuthenticated,
  AuthMiddleware.checkIfUserIsAdmin,
  ReportArticleController.getReportedArticles
);
reportArticleRoutes.get(
  '/articles/:slug/report',
  AuthMiddleware.checkIfUserIsAuthenticated,
  ReportArticleController.getReportsOnArticle
);

export default reportArticleRoutes;
