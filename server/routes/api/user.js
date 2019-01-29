import { Router } from 'express';
import UserController from '../../controllers/UserController';
import followController from '../../controllers/followController';
import AuthMiddleware from '../../middlewares/AuthMiddleware';
import handleValidationErrors from '../../middlewares/validations/handleValidationErrors';
import {
  signUpSchema,
  logInSchema,
  editProfileSchema
} from '../../middlewares/validations/userValidation';

const userRoutes = Router();

userRoutes.post('/password/forgot', UserController.forgotPassword);

userRoutes.post('/password/reset/:token', UserController.passwordReset);
userRoutes.post('/auth/verify/:token', UserController.verifyEmail);
userRoutes.post(
  '/auth/signup',
  signUpSchema,
  handleValidationErrors,
  UserController.signUp
);
userRoutes.post(
  '/auth/login',
  logInSchema,
  handleValidationErrors,
  UserController.logIn
);

userRoutes.put(
  '/users',
  AuthMiddleware.checkIfUserIsAuthenticated,
  editProfileSchema,
  handleValidationErrors,
  UserController.updateProfile
);

userRoutes.get(
  '/users/:userName',
  AuthMiddleware.checkIfUserIsAuthenticated,
  UserController.getProfile
);
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
