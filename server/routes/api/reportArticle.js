import { Router } from 'express';
import ReportArticleController from '../../controllers/ReportArticleController';
import AuthMiddleware from '../../middlewares/AuthMiddleware';
import handleValidationErrors from '../../middlewares/validations/handleValidationErrors';
import reportArticleSchema from '../../middlewares/validations/ReportArticleValidations';

const reportArticleRoutes = Router();

reportArticleRoutes.post(
  '/articles/:slug/reports',
  AuthMiddleware.checkIfUserIsAuthenticated,
  reportArticleSchema, handleValidationErrors,
  ReportArticleController.reportArticle
);
reportArticleRoutes.put(
  '/articles/:slug/reports',
  AuthMiddleware.checkIfUserIsAuthenticated,
  reportArticleSchema, handleValidationErrors,
  ReportArticleController.reportArticleUpdate
);
reportArticleRoutes.get(
  '/reports',
  AuthMiddleware.checkIfUserIsSuperAdmin,
  AuthMiddleware.checkIfUserIsAuthenticated,
  ReportArticleController.getReportedArticles
);
reportArticleRoutes.get(
  '/articles/:slug/reports',
  AuthMiddleware.checkIfUserIsAdmin,
  AuthMiddleware.checkIfUserIsAuthenticated,
  ReportArticleController.getReportsOnArticle
);
reportArticleRoutes.get(
  '/myreports',
  AuthMiddleware.checkIfUserIsAuthenticated,
  ReportArticleController.getAllReportsByUser
);
reportArticleRoutes.delete(
  '/articles/:slug/reports',
  AuthMiddleware.checkIfUserIsAuthenticated,
  ReportArticleController.deleteReportOnArticle
);

export default reportArticleRoutes;
