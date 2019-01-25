import { Router } from 'express';
import ReportArticleController from '../../controllers/ReportArticleController';
import AuthMiddleware from '../../middlewares/AuthMiddleware';
import handleValidationErrors from '../../middlewares/validations/handleValidationErrors';
import reportArticleSchema from '../../middlewares/validations/ReportArticleValidations';

const reportArticleRoutes = Router();

reportArticleRoutes.post(
  '/articles/:slug/report',
  AuthMiddleware.checkIfUserIsAuthenticated,
  reportArticleSchema, handleValidationErrors,
  ReportArticleController.reportArticle
);
reportArticleRoutes.put(
  '/articles/:slug/report',
  AuthMiddleware.checkIfUserIsAuthenticated,
  reportArticleSchema, handleValidationErrors,
  ReportArticleController.reportArticleUpdate
);
reportArticleRoutes.get(
  '/reports',
  AuthMiddleware.checkIfUserIsAuthenticated,
  ReportArticleController.getReportedArticles
);
reportArticleRoutes.get(
  '/articles/:slug/report',
  AuthMiddleware.checkIfUserIsAuthenticated,
  ReportArticleController.getReportsOnArticle
);
reportArticleRoutes.get(
  '/users/:userName/report',
  AuthMiddleware.checkIfUserIsAuthenticated,
  ReportArticleController.getAllReportsByUser
);
reportArticleRoutes.delete(
  '/articles/:slug/report',
  AuthMiddleware.checkIfUserIsAuthenticated,
  ReportArticleController.deleteReportOnArticle
);

export default reportArticleRoutes;
