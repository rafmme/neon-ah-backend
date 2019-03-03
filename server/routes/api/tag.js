import { Router } from 'express';
import TagController from '../../controllers/TagController';
import TagFeedController from '../../controllers/TagFeedContoller';
import AuthMiddleware from '../../middlewares/AuthMiddleware';

const tagRoutes = Router();

tagRoutes.get('/tags', TagController.getTags);

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

tagRoutes.get(
  '/tags/feeds',
  AuthMiddleware.checkIfUserIsAuthenticated,
  TagFeedController.getFollowingTagArticles
);
export default tagRoutes;
