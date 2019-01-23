import { Router } from 'express';
import LikesController from '../../controllers/LikesController';
import AuthManager from '../../middlewares/AuthManager';

const likeRoutes = Router();

likeRoutes.post(
  '/articles/:slug/likes',
  AuthManager.checkIfUserIsLoggedIn,
  LikesController.likeArticle
);
likeRoutes.get(
  '/articles/:slug/likes',
  AuthManager.checkIfUserIsLoggedIn,
  LikesController.articleLikes
);


export default likeRoutes;
