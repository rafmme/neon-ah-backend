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
likeRoutes.post(
  '/articles/:slug/comments/:commentId/likes',
  AuthMiddleware.checkIfUserIsAuthenticated,
  LikesController.likeComment
);

likeRoutes.get(
  '/articles/:slug/comments/:commentId/likes',
  AuthMiddleware.checkIfUserIsAuthenticated,
  LikesController.commentLikes
);

export default likeRoutes;
