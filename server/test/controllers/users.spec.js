import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import sinon from 'sinon';
import app from '../../../index';
import db from '../../models';
import TokenManager from '../../helpers/TokenManager';

const { User, Role, AuthType } = db;
let generatedToken;

chai.use(chaiHttp);

describe('User Model', () => {
  const userInfo = {
    fullName: 'Jesse Doe',
    userName: 'jesseinitot',
    email: 'jesseinit@nowt.com',
    password: 'Blahblah',
    bio: 'Gitting Started',
    authTypeId: '15745c60-7b1a-11e8-9c9c-2d42b21b1a3e'
  };

  describe('User Input Validation tests', () => {
    it('userName cannot be empty', async () => {
      const response = await chai
        .request(app)
        .post('/api/v1/auth/signup')
        .send({
          userName: '',
          fullName: userInfo.fullName,
          email: userInfo.email,
          password: userInfo.password,
          authType: userInfo.authTypeId
        });
      expect(response.status).to.be.eql(400);
      expect(response.body).to.be.an('object');
      expect(response.body).to.have.property('data');
      expect(response.body.data).to.be.an('object');
      expect(response.body.data).to.have.property('error');
      expect(response.body.data.error).to.be.an('object');
      expect(response.body.data.error.userName).to.be.eql('userName cannot be empty');
      expect(response.body).to.have.property('status');
      expect(response.body.status).to.be.a('string');
      expect(response.body.status).to.equal('failure');
    });

    it('userName cannot be an integer', async () => {
      const response = await chai
        .request(app)
        .post('/api/v1/auth/signup')
        .send({
          userName: 3,
          fullName: userInfo.fullName,
          email: userInfo.email,
          password: userInfo.password,
          authType: userInfo.authTypeId
        });
      expect(response.status).to.be.eql(400);
      expect(response.body).to.be.an('object');
      expect(response.body).to.have.property('data');
      expect(response.body.data).to.be.an('object');
      expect(response.body.data).to.have.property('error');
      expect(response.body.data.error).to.be.an('object');
      expect(response.body.data.error.userName).to.be.eql('userName has to be a string');
      expect(response.body).to.have.property('status');
      expect(response.body.status).to.be.a('string');
      expect(response.body.status).to.equal('failure');
    });

    it('userName cannot be a boolean', async () => {
      const response = await chai
        .request(app)
        .post('/api/v1/auth/signup')
        .send({
          userName: true,
          fullName: userInfo.fullName,
          email: userInfo.email,
          password: userInfo.password,
          authType: userInfo.authTypeId
        });
      expect(response.status).to.be.eql(400);
      expect(response.body).to.be.an('object');
      expect(response.body).to.have.property('data');
      expect(response.body.data).to.be.an('object');
      expect(response.body.data).to.have.property('error');
      expect(response.body.data.error).to.be.an('object');
      expect(response.body.data.error.userName).to.be.eql('userName has to be a string');
      expect(response.body).to.have.property('status');
      expect(response.body.status).to.be.a('string');
      expect(response.body.status).to.equal('failure');
    });

    it('fullName cannot be empty', async () => {
      const response = await chai
        .request(app)
        .post('/api/v1/auth/signup')
        .send({
          userName: userInfo.userName,
          fullName: '',
          email: userInfo.email,
          password: userInfo.password,
          authType: userInfo.authTypeId
        });
      expect(response.status).to.be.eql(400);
      expect(response.body).to.be.an('object');
      expect(response.body).to.have.property('data');
      expect(response.body.data).to.be.an('object');
      expect(response.body.data).to.have.property('error');
      expect(response.body.data.error).to.be.an('object');
      expect(response.body.data.error.fullName).to.be.eql('fullName cannot be empty');
      expect(response.body).to.have.property('status');
      expect(response.body.status).to.be.a('string');
      expect(response.body.status).to.equal('failure');
    });
    it('fullName cannot be an integer', async () => {
      const response = await chai
        .request(app)
        .post('/api/v1/auth/signup')
        .send({
          userName: userInfo.userName,
          fullName: 3,
          email: userInfo.email,
          password: userInfo.password,
          authType: userInfo.authTypeId
        });
      expect(response.status).to.be.eql(400);
      expect(response.body).to.be.an('object');
      expect(response.body).to.have.property('data');
      expect(response.body.data).to.be.an('object');
      expect(response.body.data).to.have.property('error');
      expect(response.body.data.error).to.be.an('object');
      expect(response.body.data.error.fullName).to.be.eql('fullName has to be a string');
      expect(response.body).to.have.property('status');
      expect(response.body.status).to.be.a('string');
      expect(response.body.status).to.equal('failure');
    });
    it('fullName cannot be a boolean', async () => {
      const response = await chai
        .request(app)
        .post('/api/v1/auth/signup')
        .send({
          userName: userInfo.userName,
          fullName: true,
          email: userInfo.email,
          password: userInfo.password,
          authType: userInfo.authTypeId
        });
      expect(response.status).to.be.eql(400);
      expect(response.body).to.be.an('object');
      expect(response.body).to.have.property('data');
      expect(response.body.data).to.be.an('object');
      expect(response.body.data).to.have.property('error');
      expect(response.body.data.error).to.be.an('object');
      expect(response.body.data.error.fullName).to.be.eql('fullName has to be a string');
      expect(response.body).to.have.property('status');
      expect(response.body.status).to.be.a('string');
      expect(response.body.status).to.equal('failure');
    });
    it('email has to be in standard format', async () => {
      const response = await chai
        .request(app)
        .post('/api/v1/auth/signup')
        .send({
          userName: userInfo.userName,
          fullName: userInfo.fullName,
          email: '',
          password: userInfo.password,
          authType: userInfo.authTypeId
        });
      expect(response.status).to.be.eql(400);
      expect(response.body).to.be.an('object');
      expect(response.body).to.have.property('data');
      expect(response.body.data).to.be.an('object');
      expect(response.body.data).to.have.property('error');
      expect(response.body.data.error).to.be.an('object');
      expect(response.body.data.error.email).to.be.eql('Enter email in the standard format');
      expect(response.body).to.have.property('status');
      expect(response.body.status).to.be.a('string');
      expect(response.body.status).to.equal('failure');
    });
    it('email has to be in standard format', async () => {
      const response = await chai
        .request(app)
        .post('/api/v1/auth/signup')
        .send({
          userName: userInfo.userName,
          fullName: userInfo.fullName,
          email: 'samuel@gmailcom',
          password: userInfo.password,
          authType: userInfo.authTypeId
        });
      expect(response.status).to.be.eql(400);
      expect(response.body).to.be.an('object');
      expect(response.body).to.have.property('data');
      expect(response.body.data).to.be.an('object');
      expect(response.body.data).to.have.property('error');
      expect(response.body.data.error).to.be.an('object');
      expect(response.body.data.error.email).to.be.eql('Enter email in the standard format');
      expect(response.body).to.have.property('status');
      expect(response.body.status).to.be.a('string');
      expect(response.body.status).to.equal('failure');
    });
    it('password cannot be empty', async () => {
      const response = await chai
        .request(app)
        .post('/api/v1/auth/signup')
        .send({
          userName: userInfo.userName,
          fullName: userInfo.fullName,
          email: 'samuel@gmail.com',
          password: '',
          authType: userInfo.authTypeId
        });
      expect(response.status).to.be.eql(400);
      expect(response.body).to.be.an('object');
      expect(response.body).to.have.property('data');
      expect(response.body.data).to.be.an('object');
      expect(response.body.data).to.have.property('error');
      expect(response.body.data.error).to.be.an('object');
      expect(response.body.data.error.password).to.be.eql('password cannot be empty');
      expect(response.body).to.have.property('status');
      expect(response.body.status).to.be.a('string');
      expect(response.body.status).to.equal('failure');
    });
    it('password cannot be an integer', async () => {
      const response = await chai
        .request(app)
        .post('/api/v1/auth/signup')
        .send({
          userName: userInfo.userName,
          fullName: userInfo.fullName,
          email: 'samuel@gmail.com',
          password: 4,
          authType: userInfo.authTypeId
        });
      expect(response.status).to.be.eql(400);
      expect(response.body).to.be.an('object');
      expect(response.body).to.have.property('data');
      expect(response.body.data).to.be.an('object');
      expect(response.body.data).to.have.property('error');
      expect(response.body.data.error).to.be.an('object');
      expect(response.body.data.error.password).to.be.eql('password has to be a string');
      expect(response.body).to.have.property('status');
      expect(response.body.status).to.be.a('string');
      expect(response.body.status).to.equal('failure');
    });
    it('password cannot be a boolean', async () => {
      const response = await chai
        .request(app)
        .post('/api/v1/auth/signup')
        .send({
          userName: userInfo.userName,
          fullName: userInfo.fullName,
          email: 'samuel@gmail.com',
          password: true,
          authType: userInfo.authTypeId
        });
      expect(response.status).to.be.eql(400);
      expect(response.body).to.be.an('object');
      expect(response.body).to.have.property('data');
      expect(response.body.data).to.be.an('object');
      expect(response.body.data).to.have.property('error');
      expect(response.body.data.error).to.be.an('object');
      expect(response.body.data.error.password).to.be.eql('password has to be a string');
      expect(response.body).to.have.property('status');
      expect(response.body.status).to.be.a('string');
      expect(response.body.status).to.equal('failure');
    });
  });

  describe('User Sign up Test', () => {
    it('should return error for existing email', async () => {
      const response = await chai
        .request(app)
        .post('/api/v1/auth/signup')
        .send({
          userName: userInfo.userName,
          fullName: userInfo.fullName,
          email: 'jesseinit@now.com',
          password: userInfo.password,
          authTypeId: userInfo.authTypeId
        });
      expect(response.status).to.equal(409);
      expect(response.body).to.be.an('object');
      expect(response.body).to.have.property('data');
      expect(response.body.data).to.be.an('object');
      expect(response.body.data).to.have.property('message');
      expect(response.body.data.message).to.be.a('string');
      expect(response.body.data.message).to.be.eql('Email already exists.Enter another email');
      expect(response.body).to.have.property('status');
      expect(response.body.status).to.be.a('string');
      expect(response.body.status).to.equal('failure');
    });

    it('should send a token back to client', async () => {
      const res = await chai
        .request(app)
        .post('/api/v1/auth/signup')
        .send({
          fullName: 'tayo',
          userName: 'tayolee',
          email: 'tayo@gmail.com',
          password: 'tayoo',
          roleId: '3ceb546e-054d-4c1d-8860-e27c209d4ae3'
        });
      expect(res).to.have.status(201);
      expect(res.body).to.be.an('object');
      expect(res.body).to.have.property('data');
      expect(res.body.data).to.be.an('object');
      expect(res.body.data).to.have.property('token');
      expect(res.body.data.token).to.be.a('string');
      expect(res.body.data).to.have.property('message');
      expect(res.body.data.message).to.be.a('string');
      expect(res.body).to.have.property('status');
      expect(res.body.status).to.be.a('string');
      expect(res.body.status).to.equal('success');
    });
  });

  describe('User Login', () => {
    it('User should get an error when provided email account is not found', async () => {
      const response = await chai
        .request(app)
        .post('/api/v1/auth/login')
        .send({ email: '' });
      expect(response.status).to.equal(400);
      expect(response.body.status).to.eqls('failure');
      expect(response.body.data.error.email).to.eqls('Enter email in the standard format');
    });

    it('User should get an error when wrong password is provided', async () => {
      const response = await chai
        .request(app)
        .post('/api/v1/auth/login')
        .send({ email: 'jesseinit@now.com', password: '123' });
      expect(response.status).to.eql(401);
      expect(response.body.status).to.eqls('failure');
      expect(response.body.data.message).to.eqls('Password is wrong');
    });

    it('User should get a token on successful login', async () => {
      const token = TokenManager.sign(
        { id: 1, userName: userInfo.username, role: userInfo.roleId },
        '24h'
      );
      expect(token).to.eqls(token);
    });
  });

  describe('Password Forget/Reset', () => {
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
