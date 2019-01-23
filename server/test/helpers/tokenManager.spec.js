import { expect } from 'chai';
import tokenManager from '../../helpers/TokenManager';

describe('It should handle Tokens', () => {
  const payload = {
    userId: 3,
    userName: 'johndough',
    userEmail: 'johndough@gmail.com',
    roleId: 2
  };
  const theToken = tokenManager.sign(payload, '24h');

  it('It should provide default expiry time of 2 hours', () => {
    const newToken = tokenManager.sign(payload);
    expect(newToken).to.be.a('string');
  });

  it('It should generate tokens', () => {
    expect(theToken).to.be.a('string');
  });

  it('It should verify tokens', async () => {
    const data = await tokenManager.verify(theToken);
    expect(data).to.be.an('object');
    expect(data.userName).to.be.eqls('johndough');
    expect(data.userId).to.be.eqls(3);
    expect(data.roleId).to.be.eqls(2);
    expect(data.userEmail).to.be.eqls('johndough@gmail.com');
  });
});
