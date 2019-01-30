import { Router } from 'express';
import passport from 'passport';
import UserController from '../../controllers/UserController';

const authRoutes = Router();

authRoutes.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
authRoutes.get(
  '/auth/google/callback',
  passport.authenticate('google', { session: false }),
  UserController.handleSocialAuth
);

authRoutes.get('/auth/facebook', passport.authenticate('facebook', { scope: ['email'] }));
authRoutes.get(
  '/auth/facebook/callback',
  passport.authenticate('facebook', { session: false }),
  UserController.handleSocialAuth
);

authRoutes.get('/auth/linkedin', passport.authenticate('linkedin'));
authRoutes.get(
  '/auth/linkedin/callback',
  passport.authenticate('linkedin', { session: false }),
  UserController.handleSocialAuth
);

authRoutes.get('/auth/twitter', passport.authenticate('twitter'));
authRoutes.get(
  '/auth/twitter/callback',
  passport.authenticate('twitter', { session: false }),
  UserController.handleSocialAuth
);

export default authRoutes;
