import { Router } from 'express';
import BookmarkController from '../../controllers/BookmarkController';
import AuthMiddleware from '../../middlewares/AuthMiddleware';

const bookmarkRoutes = Router();

bookmarkRoutes.post('/articles/:slug/bookmark', AuthMiddleware.checkIfUserIsAuthenticated, BookmarkController.createOrRemove);
bookmarkRoutes.get('/articles/:slug/bookmarks', AuthMiddleware.checkIfUserIsAuthenticated, AuthMiddleware.checkIfUserIsAdmin, BookmarkController.getArticleBookmarks);
bookmarkRoutes.get('/user/bookmarks', AuthMiddleware.checkIfUserIsAuthenticated, BookmarkController.getUserBookmarks);

export default bookmarkRoutes;
