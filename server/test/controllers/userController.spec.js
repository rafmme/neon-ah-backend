import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import sinon from 'sinon';
import app from '../../..';
import db from '../../models';
import TokenManager from '../../helpers/TokenManager';

const { User } = db;

chai.use(chaiHttp);

describe('User Model', () => {
  describe('Password Forget/Reset', () => {
    let generatedToken = null;
    after(async () => {
      await User.destroy({ where: {} });
    });

    it('User should get an error when provided email account is not found during password recovery', async () => {
      const response = await chai
        .request(app)
        .post('/api/v1/password/forgot')
        .send({
          email: 'blahblah@gmail.com'
        });
      expect(response.status).to.eqls(404);
      expect(response.body.status).to.eqls('failure');
      expect(response.body.data.message).to.eqls('User not found');
    });

    it('App should send a mail to the user if the account exists', async () => {
      const response = await chai
        .request(app)
        .post('/api/v1/password/forgot')
        .send({
          email: 'jesseinit@now.com'
        });

      expect(response.status).to.equal(200);
      expect(response.body.status).to.eqls('success');
      expect(response.body.data.message).to.eqls('Kindly check your mail to reset your password');
    });

    it('It should be able to handle unexpected DB errors thrown when sending reset link', async () => {
      const stub = sinon
        .stub(User, 'findOne')
        .callsFake(() => Promise.reject(new Error('Internal Server Error')));

      const response = await chai
        .request(app)
        .post('/api/v1/password/forgot')
        .send({
          email: 'jesseinit@now.com'
        });
      expect(response.status).to.equal(500);
      stub.restore();
    });

    it('User should get an error when provided the email account is not found in the DB', async () => {
      generatedToken = TokenManager.sign({
        email: 'blahblah@blah.com'
      });

      const response = await chai
        .request(app)
        .post(`/api/v1/password/reset/${generatedToken}`)
        .send({
          newPassword: '123456789',
          confirmPassword: '123456789'
        });
      expect(response.status).to.eqls(404);
      expect(response.body.status).to.eqls('failure');
      expect(response.body.data.message).to.eqls('User not found');
    });

    it('User should get an error token is malformed', async () => {
      const response = await chai
        .request(app)
        .post(`/api/v1/password/reset/${'malformedToken'}`)
        .send({
          newPassword: '123456789',
          confirmPassword: '123456789'
        });

      expect(response.status).to.eqls(401);
      expect(response.body.data.message).to.eqls('JsonWebTokenError');
    });

    it('It should be able to handle unexpected errors thrown during password reset', async () => {
      generatedToken = TokenManager.sign({
        email: 'blahblah@blah.com'
      });

      const stub = sinon
        .stub(User, 'findOne')
        .callsFake(() => Promise.reject(new Error('Internal Server Error')));

      const response = await chai
        .request(app)
        .post(`/api/v1/password/reset/${generatedToken}`)
        .send({
          email: 'jesseinit@now.com'
        });

      expect(response.status).to.equal(500);
      stub.restore();
    });

    it("It should reset a user's password if the account exists", async () => {
      generatedToken = TokenManager.sign({
        email: 'jesseinit@now.com'
      });

      const response = await chai
        .request(app)
        .post(`/api/v1/password/reset/${generatedToken}`)
        .send({
          newPassword: '123456789',
          confirmPassword: '123456789'
        });

      expect(response.status).to.equal(200);
      expect(response.body.status).to.eqls('success');
      expect(response.body.data.message).to.eqls(
        'Password has been successfully updated. Kindly login.'
      );
    });
  });
});
