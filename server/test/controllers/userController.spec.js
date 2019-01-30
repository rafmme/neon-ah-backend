import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import sinon from 'sinon';
import { exists } from 'fs';
import app from '../../..';
import db from '../../models';
import TokenManager from '../../helpers/TokenManager';
import {
  userToken, invalidToken, nonExistingUserToken, superAdminToken
} from '../mockData/tokens';

const { User } = db;

chai.use(chaiHttp);

describe('User Model', () => {
  const userInfo = {
    fullName: 'Mmakwe Onyeka',
    userName: 'mmakwe222',
    email: 'jesseinit@nowt.com',
    password: 'blahblah',
    confirmPassword: 'blahblah',
    bio: 'Gitting Started',
    authTypeId: '15745c60-7b1a-11e8-9c9c-2d42b21b1a3e'
  };

  describe('User Sign up Test', () => {
    it('should create user', async () => {
      const response = await chai
        .request(app)
        .post('/api/v1/auth/signup')
        .send({
          userName: userInfo.userName,
          fullName: userInfo.fullName,
          email: userInfo.email,
          password: userInfo.password,
          confirmPassword: userInfo.confirmPassword,
          authTypeId: userInfo.authTypeId
        });
      expect(response.status).to.equal(201);
      expect(response.body).to.be.an('object');
      expect(response.body).to.have.property('data');
      expect(response.body.data).to.be.an('object');
      expect(response.body.data).to.have.property('message');
      expect(response.body.data.message).to.be.a('string');
      expect(response.body.data.message).to.be.eql(
        'Kindly your check your email to verify your account'
      );
      expect(response.body).to.have.property('status');
      expect(response.body.status).to.be.a('string');
      expect(response.body.status).to.equal('success');
    });

    it('should return error for existing email', async () => {
      const response = await chai
        .request(app)
        .post('/api/v1/auth/signup')
        .send({
          userName: userInfo.userName,
          fullName: userInfo.fullName,
          email: userInfo.email,
          password: userInfo.password,
          confirmPassword: userInfo.confirmPassword,
          authTypeId: userInfo.authTypeId
        });

      expect(response.status).to.equal(409);
      expect(response.body).to.be.an('object');
      expect(response.body).to.have.property('data');
      expect(response.body.data).to.be.an('object');
      expect(response.body.data).to.have.property('message');
      expect(response.body.data.message).to.be.a('string');
      expect(response.body.data.message).to.be.eql(
        'The provided email has been taken. Kingly provide another.'
      );
      expect(response.body).to.have.property('status');
      expect(response.body.status).to.be.a('string');
      expect(response.body.status).to.equal('failure');
    });
  });

  describe('Email Verification Link', () => {
    it('It should verify a user on successful signup', async () => {
      /*  */
      const generatedToken = TokenManager.sign({
        userEmail: 'jesseinit@now.com'
      });

      const response = await chai.request(app).post(`/api/v1/auth/verify/${generatedToken}`);
      expect(response.status).to.equal(200);
      expect(response.body.status).to.eqls('success');
      expect(response.body.data.message).to.eqls('Your account has now been verified');
    });

    it('should return error for a user whose has been verified before', async () => {
      const generatedToken = TokenManager.sign({
        userEmail: 'jesseinit@now.com'
      });
      const response = await chai.request(app).post(`/api/v1/auth/verify/${generatedToken}`);

      expect(response.status).to.eqls(409);
      expect(response.body.status).to.eqls('failure');
      expect(response.body.data.error).to.eqls('Your account has already been activated.');
    });

    it('User should get an error token is malformed', async () => {
      const generatedToken = TokenManager.sign({
        userEmail: 'jesseinit1@now.com'
      });
      const malformedToken = generatedToken.toUpperCase();

      const response = await chai.request(app).post(`/api/v1/auth/verify/${malformedToken}`);

      expect(response.status).to.eqls(400);
      expect(response.body.data.error.name).to.eqls('JsonWebTokenError');
    });
  });

  describe('User Login', () => {
    it('User should get an error when provided email account is not found', async () => {
      const response = await chai
        .request(app)
        .post('/api/v1/auth/login')
        .send({
          user: 'nonExistingUser',
          password: '12345768'
        });
      expect(response.status).to.eql(404);
      expect(response.body.status).to.eqls('failure');
      expect(response.body.data.message).to.be.eql(
        'Sorry!!, Your login information is not correct.'
      );
    });

    it('User should get an error when wrong password is provided', async () => {
      const response = await chai
        .request(app)
        .post('/api/v1/auth/login')
        .send({ user: 'jesseinit@now.com', password: '123656745676' });
      expect(response.status).to.eql(401);
      expect(response.body.status).to.eqls('failure');
      expect(response.body.data.message).to.eqls('Sorry!!, Your login information is not correct.');
    });

    it('User should get loggedIn and token returned when correct credentials are provided', async () => {
      const response = await chai
        .request(app)
        .post('/api/v1/auth/login')
        .send({ user: userInfo.userName, password: userInfo.password });
      expect(response.status).to.eql(200);
      expect(response.body.status).to.eqls('success');
      expect(response.body.data.token).to.be.a('String');
    });
  });

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
      expect(response.body.data.message).to.eqls('Kindly check your mail to reset your password');
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
      expect(response.body.data.message).to.eqls(
        'Sorry! Link has expired. Kindly re-initiate password reset.'
      );
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
        .get('/api/v1/users/jesseinit')
        .set('Authorization', `Bearer ${userToken}`);

      expect(response.status).to.eqls(200);
      expect(response.body.status).to.eqls('success');
      expect(response.body.data.statusCode).to.eqls(200);
      expect(response.body.data.payload).to.be.an('object');
    });

    it("User should show an error when the username does'nt exist", async () => {
      const response = await chai
        .request(app)
        .get('/api/v1/users/jesseinitjesseinit')
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
        .get('/api/v1/users/jesseinit')
        .set('Authorization', `Bearer ${userToken}`);
      expect(response.status).to.eqls(500);
      stub.restore();
    });
  });

  describe('Update User Profile', () => {
    it('Should show error response when trying to update without being authenticated', async () => {
      const response = await chai
        .request(app)
        .put('/api/v1/users')
        .send({ bio: 'I am so hungry' });

      expect(response.status).to.eqls(401);
      expect(response.body.status).to.eqls('failure');
      expect(response.body.data.message).to.eqls('You are not logged in.');
    });

    it('Should show error response when trying to update without being fake token', async () => {
      const response = await chai
        .request(app)
        .put('/api/v1/users')
        .set('Authorization', `Bearer ${invalidToken}`)

        .send({ bio: 'I am so hungry' });
      expect(response.status).to.eqls(401);
      expect(response.body.status).to.eqls('failure');
      expect(response.body.data.message).to.eqls('Token is invalid, You need to log in again');
    });

    it('User should show conflict error when user tries to edit profile with username that exists', async () => {
      const response = await chai
        .request(app)
        .put('/api/v1/users')
        .set('Authorization', `Bearer ${userToken}`)
        .send({
          userName: 'jesseinit',
          fullName: 'Jesse',
          email: 'jesseinit@now.com',
          password: 'Blahblah',
          bio: '',
          img: ''
        });
      expect(response.status).to.eqls(409);
      expect(response.body.status).to.eqls('failure');
      expect(response.body.data.message).to.eqls('Username already exists');
      expect(response.body.data.statusCode).to.eqls(409);
    });

    it('User should show proper error when user tries to edit profile with invalid bio data', async () => {
      const response = await chai
        .request(app)
        .put('/api/v1/users')
        .set('Authorization', `Bearer ${userToken}`)
        .send({
          bio: 1,
          userName: 'jesseinit',
          fullName: 'Jesse',
          email: 'jesseinit@now.com',
          password: 'Blahblah',
          img: ''
        });
      expect(response.status).to.eqls(422);
      expect(response.body.status).to.eqls('failure');
      expect(response.body.data.error[0]).to.eqls('Bio can only be string');
    });

    it('User should show proper error when user tries to edit profile with invalid notifySetting data', async () => {
      const response = await chai
        .request(app)
        .put('/api/v1/users')
        .set('Authorization', `Bearer ${userToken}`)
        .send({
          getInAppNotification: 3,
          userName: 'jesseinit',
          fullName: 'Jesse',
          email: 'jesseinit@now.com',
          password: 'Blahblah',
          bio: '',
          img: ''
        });
      expect(response.status).to.eqls(422);
      expect(response.body.status).to.eqls('failure');
      expect(response.body.data.error[0]).to.eqls('In-app notification settings must be a Boolean');
    });

    it('User should show proper error when user tries to edit profile with invalid username data', async () => {
      const response = await chai
        .request(app)
        .put('/api/v1/users')
        .set('Authorization', `Bearer ${userToken}`)
        .send({
          userName: 3,
          fullName: 'Jesse',
          email: 'jesseinit@now.com',
          password: 'Blahblah',
          bio: '',
          img: ''
        });
      expect(response.status).to.eqls(422);
      expect(response.body.status).to.eqls('failure');
      expect(response.body.data.error).to.be.an('Array');
      expect(response.body.data.error[0]).to.eqls('Username has to be a string');
    });

    it('User should show proper error when user tries to edit profile with empty Fullname', async () => {
      const response = await chai
        .request(app)
        .put('/api/v1/users')
        .set('Authorization', `Bearer ${nonExistingUserToken}`)
        .send({
          fullName: 'Jeese'
        });
      expect(response.status).to.eqls(404);
      expect(response.body.status).to.eqls('failure');
      expect(response.body.data.message).to.eqls('User not found');
    });

    it('User should update the user profile when the correct user tries to edit his profile', async () => {
      const response = await chai
        .request(app)
        .put('/api/v1/users')
        .set('Authorization', `Bearer ${userToken}`)
        .send({ userName: 'john' });
      expect(response.status).to.eqls(200);
      expect(response.body.status).to.eqls('success');
      expect(response.body.data.message).to.eqls('Profile updated successfully');
    });

    it('Should should handle DB errors when updating the profile of the user', async () => {
      const stub = sinon.stub(User, 'findOne').rejects(new Error('Internal server error!'));

      const response = await chai
        .request(app)
        .put('/api/v1/users')
        .set('Authorization', `Bearer ${userToken}`)
        .send({ userName: 'john' });
      expect(response.status).to.eqls(500);
      expect(response.body.status).to.eqls('failure');
      expect(response.body.data.message).to.eqls('An error occured on the server');
      stub.restore();
    });
  });

  describe('Toggle User to Admin', () => {
    it('Should throw an error when User tries to use a fake token', async () => {
      const response = await chai
        .request(app)
        .put('/api/v1/upgrade/user/steve')
        .set('Authorization', `Bearer ${invalidToken}`);
      expect(response.status).to.eqls(401);
      expect(response.body.status).to.eqls('failure');
      expect(response.body.data.message).to.eqls('Token is invalid, You need to log in again');
    });

    it('Should throw an error if a Non-Super Admin tries to access the route', async () => {
      const response = await chai
        .request(app)
        .put('/api/v1/upgrade/user/steve')
        .set('Authorization', `Bearer ${userToken}`);
      expect(response.status).to.eqls(403);
      expect(response.body.status).to.eqls('failure');
      expect(response.body.data.message).to.eqls('You are unauthorised to access this page.');
    });

    it('Should throw an error if the User is not found', async () => {
      const response = await chai
        .request(app)
        .put('/api/v1/upgrade/user/dimeji')
        .set('Authorization', `Bearer ${superAdminToken}`);
      expect(response.status).to.eqls(404);
      expect(response.body.status).to.eqls('failure');
      expect(response.body.data.message).to.eqls('This User is not found');
    });

    it('Should upgrade a user to admin', async () => {
      const response = await chai
        .request(app)
        .put('/api/v1/upgrade/user/steve')
        .set('Authorization', `Bearer ${superAdminToken}`);
      expect(response.status).to.eqls(200);
      expect(response.body.status).to.eqls('success');
      expect(response.body.data.message).to.eqls('The User role has been upgraded to Admin');
    });

    it('Should downgrade an admin to user', async () => {
      const response = await chai
        .request(app)
        .put('/api/v1/upgrade/user/steve')
        .set('Authorization', `Bearer ${superAdminToken}`);
      expect(response.status).to.eqls(200);
      expect(response.body.status).to.eqls('success');
      expect(response.body.data.message).to.eqls('The User role has been downgraded to User');
    });
  });
});
