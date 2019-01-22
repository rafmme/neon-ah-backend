import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../../..';
import { user } from '../../helpers/MockStrategy';

chai.use(chaiHttp);

describe('Authentication', () => {
  describe('Social Authentication with Google', () => {
    it('should return a JWT when user successfully authenticates', async () => {
      user.emails = [{ value: 'jesseinit@now.com' }];
      const response = await chai.request(app).get('/api/v1/auth/google/callback');
      expect(response).to.redirect;
    });
  });

  describe('Social Authentication with Facebook', () => {
    it('should return a JWT when user successfully authenticates', async () => {
      user.emails = [{ value: 'jesseinit@now.com' }];
      const response = await chai.request(app).get('/api/v1/auth/facebook/callback');
      expect(response).to.redirect;
    });
  });

  describe('Social Authentication with Linkedin', () => {
    it('should return a JWT when user successfully authenticates', async () => {
      user.emails = [{ value: 'jesseinit@now.com' }];
      const response = await chai.request(app).get('/api/v1/auth/linkedin/callback');
      expect(response).to.redirect;
    });
  });
});
