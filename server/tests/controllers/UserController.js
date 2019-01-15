import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import sinon from 'sinon';
import app from '../../..';
import db from '../../models';
import TokenManager from '../../helpers/TokenManager';

const { Users } = db;

chai.use(chaiHttp);

describe('User Model', () => {
  const userInfo = {
    full: 'Jesse',
    lastName: 'Pinkman',
    username: 'jesseinit',
    email: 'jesseinit@now.com',
    bio: 'Gitting Started',
    password: 'blahblah'
  };

  before(async () => {
    await Users.create(userInfo, { fields: Object.keys(userInfo) });
  });

  after(async () => {
    await Users.destroy({ where: {} });
  });
  describe('User Login', () => {
    it('User should get an error when provided email account is not found on password reset', async () => {
      const response = await chai
        .request(app)
        .post('/api/v1/password/forgot')
        .send({ email: 'blahblah@gmail.com' });

      expect(response.status).to.eqls(404);
      expect(response.body.status).to.eqls('failure');
      expect(response.body.message).to.eqls('User not found');
    });
  });
});
