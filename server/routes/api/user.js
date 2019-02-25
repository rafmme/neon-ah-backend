import { Router } from 'express';
import UserController from '../../controllers/UserController';
import FollowController from '../../controllers/followController';
import AuthMiddleware from '../../middlewares/AuthMiddleware';
import handleValidationErrors from '../../middlewares/validations/handleValidationErrors';
import {
  signUpSchema,
  logInSchema,
  editProfileSchema
} from '../../middlewares/validations/userValidation';
import ArticleController from '../../controllers/ArticleController';
import ArticleValidation from '../../middlewares/validations/ArticleValidation';

const userRoutes = Router();

userRoutes.post('/password/forgot', UserController.forgotPassword);

userRoutes.post('/password/reset/:token', UserController.passwordReset);
userRoutes.post('/auth/verify/:token', UserController.verifyEmail);
userRoutes.post('/auth/resend-verification-link', UserController.resendVerificationEmail);
userRoutes.post('/auth/signup', signUpSchema, handleValidationErrors, UserController.signUp);
userRoutes.post('/auth/login', logInSchema, handleValidationErrors, UserController.logIn);

userRoutes.put(
  '/users',
  AuthMiddleware.checkIfUserIsAuthenticated,
  editProfileSchema,
  handleValidationErrors,
  UserController.updateProfile
);

userRoutes.put(
  '/upgrade/user/:userName',
  AuthMiddleware.checkIfUserIsAuthenticated,
  AuthMiddleware.checkIfUserIsSuperAdmin,
  UserController.toggleUserToAdmin
);

userRoutes.get('/users/:userName', UserController.getProfile);

userRoutes.get('/users/:userName/followers', FollowController.getFollowers);

userRoutes.get('/users/:userName/following', FollowController.getFollowing);

userRoutes.post(
  '/users/:userName/follow',
  AuthMiddleware.checkIfUserIsAuthenticated,
  FollowController.followUser
);

userRoutes.delete(
  '/users/:userName/unfollow',
  AuthMiddleware.checkIfUserIsAuthenticated,
  FollowController.unfollowUser
);
userRoutes.get(
  '/myArticles',
  AuthMiddleware.checkIfUserIsAuthenticated,
  ArticleValidation.verifyLimitParams,
  ArticleValidation.verifyPageParams,
  ArticleController.fetchAllUserArticles
);
userRoutes.get(
  '/myArticles/:slug',
  AuthMiddleware.checkIfUserIsAuthenticated,
  ArticleController.fetchOne
);

userRoutes.get(
  '/notifications',
  AuthMiddleware.checkIfUserIsAuthenticated,
  ArticleValidation.verifyLimitParams,
  ArticleValidation.verifyPageParams,
  UserController.fetchNotifications
);

userRoutes.put(
  '/notifications/:notificationId',
  AuthMiddleware.checkIfUserIsAuthenticated,
  UserController.updateNotification
);

export default userRoutes;
