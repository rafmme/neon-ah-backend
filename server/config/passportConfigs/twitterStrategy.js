/* import { Strategy as TwitterStrategy } from 'passport-twitter';
import env from 'dotenv';
import UserController from '../../controllers/UserController';
import { MockStrategy } from '../../helpers/MockStrategy';

env.config();

const twitterStategy = new TwitterStrategy(
  {
    consumerKey: process.env.TWITTER_CLIENT_ID,
    consumerSecret: process.env.TWITTER_CLIENT_SECRET,
    callbackURL: `${process.env.BACKEND_URL}/api/v1/auth/twitter/callback`,
    includeEmail: true
  },
  UserController.strategyCallback
);

const mockStrategy = new MockStrategy('twitter', UserController.strategyCallback); */
/* istanbul ignore next */
/* const twitter = process.env.NODE_ENV === 'test' ? mockStrategy : twitterStategy;

export default twitter; */
