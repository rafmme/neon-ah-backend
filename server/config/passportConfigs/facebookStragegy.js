import { Strategy as FacebookStrategy } from 'passport-facebook';
import env from 'dotenv';
import UserController from '../../controllers/UserController';
import { MockStrategy } from '../../helpers/MockStrategy';

env.config();

const facebookStrategy = new FacebookStrategy(
  {
    clientID: process.env.FACEBOOK_CLIENT_ID,
    clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
    callbackURL: 'http://localhost:3000/api/v1/auth/facebook/callback',
    profileFields: ['id', 'emails', 'photos', 'displayName']
  },
  UserController.strategyCallback
);
const mockStrategy = new MockStrategy('facebook', UserController.strategyCallback);

/* istanbul ignore next */
const facebook = process.env.NODE_ENV === 'test' ? mockStrategy : facebookStrategy;

export default facebook;
