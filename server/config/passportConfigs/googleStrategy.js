import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import env from 'dotenv';
import UserController from '../../controllers/UserController';
import { MockStrategy } from '../../helpers/MockStrategy';

env.config();

const googleStrategy = new GoogleStrategy(
  {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: 'http://localhost:3000/api/v1/auth/google/callback'
  },
  UserController.strategyCallback
);

const mockStrategy = new MockStrategy('google', UserController.strategyCallback);
const google = process.env.NODE_ENV === 'test' ? mockStrategy : googleStrategy;

export default google;
