import { expect } from 'chai';
import tokenManager from '../../helpers/TokenManager';

describe('It should handle Tokens', () => {
  const payload = {
    id: 3,
    userName: 'johndough',
    role: 2
  };
  const theToken = tokenManager.sign(payload, '24h');

  it('It should provide default expiry time of 2 hours', () => {
    const newToken = tokenManager.sign(payload);
    expect(newToken).to.be.a('string');
  });

  it('It should generate tokens', () => {
    expect(theToken).to.be.a('string');
  });

  it('It should verify tokens', () => {
    const data = tokenManager.verify(theToken);
    expect(data).to.be.an('object');
    expect(data.userName).to.be.eqls('johndough');
    expect(data.id).to.be.eqls(3);
  });
});
