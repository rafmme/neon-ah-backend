import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import sinon from 'sinon';
import app from '../../..';
import db from '../../models';
import TokenManager from '../../helpers/TokenManager';
// import { token } from '../mockData/token';
import { userToken, userToken2, invalidToken } from '../mockData/tokens'
import token from '../mockData/tokens';
import { exists } from 'fs';

const { User } = db;

chai.use(chaiHttp);

describe('User Model', () => {
  describe('Password Forget/Reset', () => {
    let generatedToken = null;
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
      expect(response.body.data.message).to.eqls(
        'Kindly check your mail to reset your password'
      );
    });

    it('It should be able to handle unexpected DB errors thrown when sending reset link', async () => {
      const stub = sinon
        .stub(User, 'findOne')
        .callsFake(() => Promise.reject(new Error('Internal Server Error')));

      const response = await chai
        .request(app)
        .post('/api/v1/password/forgot')
        .send({ email: 'jesseinit@now.com' });

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

  describe('Get User Profile', () => {
    it('User should be view the profile of users when the right username is used', async () => {
      const response = await chai
        .request(app)
        .get(`/api/v1/users/jesseinit`)
        .set('Authorization', `Bearer ${userToken}`);

      expect(response.status).to.eqls(200);
      expect(response.body.status).to.eqls('success');
      expect(response.body.data.statusCode).to.eqls(200);
      expect(response.body.data.payload).to.be.an('object');
    });

    it("User should show an error when the username does'nt exist", async () => {
      const response = await chai
        .request(app)
        .get(`/api/v1/users/jesseinitjesseinit`)
        .set('Authorization', `Bearer ${userToken}`);

      expect(response.status).to.eqls(404);
      expect(response.body.status).to.eqls('failure');
      expect(response.body.data.statusCode).to.eqls(404);
      expect(response.body.data.message).to.eqls('User not found');
    });

    it('Should should handle unexpected errors when finding the profile of the user', async () => {
      const stub = sinon
        .stub(User, 'findOne')
        .callsFake(() => Promise.reject(new Error('Internal Server Error')));

      const response = await chai
        .request(app)
        .get(`/api/v1/users/jesseinit`)
        .set('Authorization', `Bearer ${userToken}`);
      expect(response.status).to.eqls(500);
      stub.restore();
    });
  });

  describe('Update User Profile', () => {

    it('Should show error response when trying to update without being registered', async () => {
      const response = await chai
        .request(app)
        .put(`/api/v1/users`)
        .send({ bio: 'I am so hungry' });

      expect(response.status).to.eqls(401);
      expect(response.body.status).to.eqls('failure');
      expect(response.body.data.message).to.eqls('You are not logged in.');
    });

    it('Should show error response when trying to update without being fake token', async () => {
      const response = await chai
        .request(app)
        .put(`/api/v1/users`)
        .set('Authorization', `Bearer ${invalidToken}`)

        .send({ bio: 'I am so hungry' });
      expect(response.status).to.eqls(401);
      expect(response.body.status).to.eqls('failure');
      expect(response.body.data.message).to.eqls(
        'Token is invalid, You need to log in again'
      );
    });

    it('User should show proper error when user tries to edit profile with username that exists', async () => {
      const response = await chai
        .request(app)
        .put(`/api/v1/users`)
        .set('Authorization', `Bearer ${userToken}`)
        .send({ userName: 'jesseinit', fullName: 'Jesse', email: 'jesseinit@now.com', password: 'Blahblah', notifySettings: true, bio: '', img: '' });
      expect(response.status).to.eqls(409);
      expect(response.body.status).to.eqls('failure');
      expect(response.body.data.message).to.eqls('Username already exists');
      expect(response.body.data.statusCode).to.eqls(409);
    });

    it('User should show proper error when user tries to edit profile with invalid bio data', async () => {
      const response = await chai
        .request(app)
        .put(`/api/v1/users`)
        .set('Authorization', `Bearer ${userToken}`)
        .send({ bio: 1, userName: 'jesseinit', fullName: 'Jesse', email: 'jesseinit@now.com', password: 'Blahblah', notifySettings: true, img: '' });
      expect(response.status).to.eqls(422);
      expect(response.body.status).to.eqls('failure');
      expect(response.body.data.error[0]).to.eqls('Bio can only be string');
    });

    it('User should show proper error when user tries to edit profile with invalid notifySetting data', async () => {
      const response = await chai
        .request(app)
        .put(`/api/v1/users`)
        .set('Authorization', `Bearer ${userToken}`)
        .send({ notifySettings: 3, userName: 'jesseinit', fullName: 'Jesse', email: 'jesseinit@now.com', password: 'Blahblah', bio: '', img: '' });
      expect(response.status).to.eqls(422);
      expect(response.body.status).to.eqls('failure');
      expect(response.body.data.error[0]).to.eqls(
        'Notification settings must be a Boolean'
      );
    });

    it('User should show proper error when user tries to edit profile with invalid username data', async () => {
      const response = await chai
        .request(app)
        .put(`/api/v1/users`)
        .set('Authorization', `Bearer ${userToken}`)
        .send({ userName: 3, fullName: 'Jesse', email: 'jesseinit@now.com', password: 'Blahblah', notifySettings: true, bio: '', img: '' });
      expect(response.status).to.eqls(422);
      expect(response.body.status).to.eqls('failure');
      expect(response.body.data.error[0]).to.eqls(
        'Username has to be a string'
      );
    });

    it('User should show proper error when user tries to edit profile with empty Fullname', async () => {
      const response = await chai
        .request(app)
        .put(`/api/v1/users`)
        .set('Authorization', `Bearer ${userToken}`)
        .send({ fullName: '', userName: 'jesseinit', email: 'jesseinit@now.com', password: 'Blahblah', notifySettings: true, bio: '', img: '' });
      expect(response.status).to.eqls(422);
      expect(response.body.status).to.eqls('failure');
      expect(response.body.data.error[0]).to.eqls(
        'fullname cannot be empty'
      );
    });

    it('Should should handle unexpected errors when updating the profile of the user', async () => {
      const stub = sinon
        .stub(User, 'findOne')
        .rejects(new Error('Internal server error!'));

      const response = await chai
        .request(app)
        .put(`/api/v1/users`)
        .set('Authorization', `Bearer ${userToken}`);
      expect(response.status).to.eqls(422);
      stub.restore();

      it('User should update the user profile when the correct user tries to edit his profile', async () => {
        const response = await chai
          .request(app)
          .put(`/api/v1/users`)
          .set('Authorization', `Bearer ${userToken}`)
          .send({ userName: 'john' });
        expect(response.status).to.eqls(205);
        expect(response.body.status).to.eqls('success');
        expect(response.body.data.message).to.eqls(
          'Profile updated successfully'
        );
      });
    });
  });
});
