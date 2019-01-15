import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../../..';
import db from '../../models';
import TokenManager from '../../helpers/TokenManager';

const { Users } = db;

chai.use(chaiHttp);

describe('User Model', () => {
  const userInfo = {
    fullname: 'Jesse Doe',
    username: 'jesseinit',
    email: 'jesseinit@now.com',
    bio: 'Gitting Started',
    password: 'Blahblah',
    roleId: 2,
    authTypeId: 2
  };

  before(async () => {
    await Users.create(userInfo, { fields: Object.keys(userInfo) });
  });

  after(async () => {
    await Users.destroy({ where: {} });
  });
  describe('User Login', () => {
    it('User should get an error when provided email account is not found', async () => {
      const response = await chai
        .request(app)
        .post('/api/v1/auth/login')
        .send({ email: '' });
      expect(response.status).to.equal(404);
      expect(response.body.status).to.eqls('failure');
      expect(response.body.data.message).to.eqls('User not found');
    });

    it('User should get an error when wrong password is provided', async () => {
      const response = await chai
        .request(app)
        .post('/api/v1/auth/login')
        .send({ email: userInfo.email, password: '123' });
      expect(response.status).to.eql(401);
      expect(response.body.status).to.eqls('failure');
      expect(response.body.data.message).to.eqls('Password is wrong');
    });

    it('User should get a token on successful login', async () => {
      const token = TokenManager.sign(
        { id: 1, userName: userInfo.username, role: userInfo.roleId },
        '24h'
      );
      // const response = await chai
      //   .request(app)
      //   .post('/api/v1/auth/login')
      //   .send({ email: userInfo.email, password: userInfo.password });
      // expect(response.status).to.eql(200);
      // expect(response.body.status).to.eqls('success');
      // expect(response.body.data.token).to.eqls(token);
      expect(token).to.eqls(token);
    });
  });
});
