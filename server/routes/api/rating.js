import { Router } from 'express';
import RatingController from '../../controllers/RatingController';
import AuthMiddleware from '../../middlewares/AuthMiddleware';

const ratingRoutes = Router();

ratingRoutes.get(
  '/articles/:slug/ratings',
  AuthMiddleware.checkIfUserIsAuthenticated,
  RatingController.getArticleRatings
);
ratingRoutes.get(
  '/user/ratings',
  AuthMiddleware.checkIfUserIsAuthenticated,
  RatingController.getUserRatings
);
ratingRoutes.put(
  '/articles/:slug/rating',
  AuthMiddleware.checkIfUserIsAuthenticated,
  RatingController.updateOrCreate
);
ratingRoutes.delete(
  '/articles/:slug/rating',
  AuthMiddleware.checkIfUserIsAuthenticated,
  RatingController.delete
);

export default ratingRoutes;
