import { Router } from 'express';
import LikesController from '../../controllers/LikesController';
import AuthMiddleware from '../../middlewares/AuthMiddleware';

const likeRoutes = Router();

likeRoutes.post(
  '/articles/:slug/likes',
  AuthMiddleware.checkIfUserIsAuthenticated,
  LikesController.likeArticle
);
likeRoutes.get(
  '/articles/:slug/likes',
  AuthMiddleware.checkIfUserIsAuthenticated,
  LikesController.articleLikes
);
likeRoutes.get(
  '/users/:userName/likes',
  AuthMiddleware.checkIfUserIsAuthenticated,
  LikesController.getLikesByUser
);


export default likeRoutes;
