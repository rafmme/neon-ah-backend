import { Router } from 'express';
import TagController from '../../controllers/TagController';
import AuthMiddleware from '../../middlewares/AuthMiddleware';


const tagRoutes = Router();

tagRoutes.post(
  '/tags/:tagName/follow',
  AuthMiddleware.checkIfUserIsAuthenticated,
  TagController.follow
);

tagRoutes.delete(
  '/tags/:tagName/unfollow',
  AuthMiddleware.checkIfUserIsAuthenticated,
  TagController.unFollow
);

tagRoutes.get(
  '/tags/followedTags',
  AuthMiddleware.checkIfUserIsAuthenticated,
  TagController.getFollowedTags
);

export default tagRoutes;
