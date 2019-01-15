import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import sinon from 'sinon';
import app from '../../..';
import db from '../../models';
import TokenManager from '../../helpers/TokenManager';

const { Users } = db;

chai.use(chaiHttp);

describe('User Model', () => {
  describe('Password Forget/Reset', () => {
    const userInfo = {
      firstName: 'Jesse',
      lastName: 'Pinkman',
      username: 'jesseinit',
      email: 'jesseinit@now.com',
      bio: 'Gitting Started',
      password: 'blahblah'
    };

    let generatedToken = null;

    before(async () => {
      await Users.create(userInfo, { fields: Object.keys(userInfo) });
    });

    after(async () => {
      await Users.destroy({ where: {} });
    });

    it('User should get an error when provided email account is not found on password reset', async () => {
      const response = await chai
        .request(app)
        .post('/api/v1/password/forgot')
        .send({ email: 'blahblah@gmail.com' });

      expect(response.status).to.eqls(404);
      expect(response.body.status).to.eqls('failure');
      expect(response.body.message).to.eqls('User not found');
    });

    it('App should send a mail to the user if the account exists', async () => {
      const response = await chai
        .request(app)
        .post('/api/v1/password/forgot')
        .send({ email: userInfo.email });

      expect(response.status).to.equal(200);
      expect(response.body.status).to.eqls('success');
      expect(response.body.message).to.eqls('Kindly check your mail to reset your password');
    });

    it('It should be able to handle unexpected errors thrown during when sending reset link', async () => {
      const stub = sinon
        .stub(Users, 'findOne')
        .callsFake(() => Promise.reject('Internal Server Error'));

      const response = await chai
        .request(app)
        .post('/api/v1/password/forgot')
        .send({ email: userInfo.email });
      expect(response.status).to.equal(500);
      expect(response.body.error).to.eql('Internal Server Error');
      stub.restore();
    });

    it('User should get an error when provided email account is not found in the DB', async () => {
      generatedToken = TokenManager.sign({ email: 'blahblah@blah.com' });

      const response = await chai
        .request(app)
        .post(`/api/v1/password/reset/${generatedToken}`)
        .send({ newPassword: '123456789', confirmPassword: '123456789' });

      expect(response.status).to.eqls(404);
      expect(response.body.status).to.eqls('failure');
      expect(response.body.message).to.eqls('User not found');
    });

    it('User should get an error token is malformed', async () => {
      const response = await chai
        .request(app)
        .post(`/api/v1/password/reset/${'malformedToken'}`)
        .send({ newPassword: '123456789', confirmPassword: '123456789' });

      expect(response.status).to.eqls(401);
      expect(response.body.message).to.eqls('JsonWebTokenError');
    });

    it('It should be able to handle unexpected errors thrown during password reset', async () => {
      generatedToken = TokenManager.sign({ email: 'blahblah@blah.com' });

      const stub = sinon
        .stub(Users, 'findOne')
        .callsFake(() => Promise.reject('Internal Server Error'));

      const response = await chai
        .request(app)
        .post(`/api/v1/password/reset/${generatedToken}`)
        .send({ email: userInfo.email });
      expect(response.status).to.equal(500);
      expect(response.body.error).to.eql('Internal Server Error');
      stub.restore();
    });

    it("should reset a user's password if the account exists", async () => {
      generatedToken = TokenManager.sign({ email: userInfo.email });

      const response = await chai
        .request(app)
        .post(`/api/v1/password/reset/${generatedToken}`)
        .send({ newPassword: '123456789', confirmPassword: '123456789' });

      expect(response.status).to.equal(200);
      expect(response.body.status).to.eqls('success');
      expect(response.body.message).to.eqls(
        'Password has been successfully updated. Kindly login.'
      );
    });
  });
});
