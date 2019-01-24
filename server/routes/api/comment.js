import { Router } from 'express';
import CommentController from '../../controllers/CommentController';
import AuthMiddleware from '../../middlewares/AuthMiddleware';
import { handleValidationErrors, commentSchema } from '../../middlewares/validations/CommentValidations';

const commentRoutes = Router();

commentRoutes.post('/articles/:slug/comments', AuthMiddleware.checkIfUserIsAuthenticated, commentSchema, handleValidationErrors, CommentController.addComment);
commentRoutes.get('/articles/:slug/comments', AuthMiddleware.checkIfUserIsAuthenticated, CommentController.getComments);
commentRoutes.get('/articles/:slug/comments/:commentId', AuthMiddleware.checkIfUserIsAuthenticated, CommentController.getSingleComments);
commentRoutes.put('/articles/:slug/comments/:commentId', AuthMiddleware.checkIfUserIsAuthenticated, commentSchema, handleValidationErrors, CommentController.updateComment);
commentRoutes.delete('/articles/:slug/comments/:commentId', AuthMiddleware.checkIfUserIsAuthenticated, CommentController.deleteComment);

export default commentRoutes;
