import { Router } from 'express';
import UserController from '../../controllers/UserController';
import userValidator from '../../middlewares/validations/userValidator';
import followController from '../../controllers/followController';
import AuthMiddleware from '../../middlewares/AuthMiddleware';

const userRoutes = Router();

userRoutes.post('/password/forgot', UserController.forgotPassword);

userRoutes.post('/password/reset/:token', UserController.passwordReset);
userRoutes.post('/auth/signup', userValidator.validateUserSignupInput, UserController.signUp);
userRoutes.post('/auth/login', userValidator.validateUserLoginInput, UserController.logIn);
userRoutes.post('/auth/verify/:token', UserController.verifyEmail);

userRoutes.put(
  '/users',
  AuthMiddleware.checkIfUserIsAuthenticated,
  userValidator.editProfileValidate,
  UserController.updateProfile
);

userRoutes.get('/users/:userName', AuthMiddleware.checkIfUserIsAuthenticated, UserController.getProfile);
userRoutes.get('/users/:userName/followers', followController.getFollowers);

userRoutes.get('/users/:userName/following', followController.getFollowing);

userRoutes.post(
  '/users/:userName/follow',
  AuthMiddleware.checkIfUserIsAuthenticated,
  followController.followUser
);

userRoutes.delete(
  '/users/:userName/unfollow',
  AuthMiddleware.checkIfUserIsAuthenticated,
  followController.unfollowUser
);
export default userRoutes;
