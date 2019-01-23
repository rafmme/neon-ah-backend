import { Router } from 'express';
import UserController from '../../controllers/UserController';
import ArticleController from '../../controllers/ArticleController';
import AuthMiddleware from '../../middlewares/AuthMiddleware';
import userValidator from '../../middlewares/validations/userValidator';

const userRoutes = Router();

userRoutes.post('/password/forgot', UserController.forgotPassword);

userRoutes.post('/password/reset/:token', UserController.passwordReset);
userRoutes.post('/auth/signup', userValidator.validateUserSignupInput, UserController.signUp);
userRoutes.post('/auth/login', userValidator.validateUserLoginInput, UserController.logIn);
userRoutes.get(
  '/myArticles',
  AuthMiddleware.checkIfUserIsAuthenticated,
  ArticleController.fetchAllUserArticles
);
userRoutes.get(
  '/myArticles/:slug',
  AuthMiddleware.checkIfUserIsAuthenticated,
  ArticleController.fetchOne
);


export default userRoutes;
