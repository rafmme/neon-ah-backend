/* import { Strategy as LinkedInStrategy } from 'passport-linkedin-oauth2';
import env from 'dotenv';
import UserController from '../../controllers/UserController';
import { MockStrategy } from '../../helpers/MockStrategy';

env.config();

const linkedinStrategy = new LinkedInStrategy(
  {
    clientID: process.env.LINKEDIN_CLIENT_ID,
    clientSecret: process.env.LINKEDIN_CLIENT_SECRET,
    callbackURL: `${process.env.BACKEND_URL}/api/v1/auth/linkedin/callback`,
    scope: ['r_emailaddress', 'r_basicprofile']
  },
  UserController.strategyCallback
);

const mockStrategy = new MockStrategy('linkedin', UserController.strategyCallback); */
/* istanbul ignore next */
/* const linkedin = process.env.NODE_ENV === 'test' ? mockStrategy : linkedinStrategy;

export default linkedin;
 */