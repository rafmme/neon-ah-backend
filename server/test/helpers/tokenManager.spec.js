import { expect } from 'chai';
import tokenManager from '../../helpers/TokenManager';

describe('It should handle Tokens', () => {
  const token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywidXNlck5hbWUiOiJqb2huZG91Z2giLCJyb2xlIjoyLCJpYXQiOjE1NDc2MTE0MDIsImV4cCI6MTU0NzY5NzgwMn0.l4d4cCmCUJFXXkT69B7fQb0B4mqnL22EOhMKoL2_uyU';
  const payload = {
    id: 3,
    userName: 'johndough',
    role: 2
  };
  // const secret = process.env.JWT_SECRET;

  it('It should generate tokens', () => {
    const theToken = tokenManager.sign(payload, '24h');
    expect(theToken).to.be.a('string');
  });

  it('It should verify tokens', () => {
    const data = tokenManager.verify(token);
    expect(data).to.be.an('object');
    expect(data.userName).to.be.eqls('johndough');
    expect(data.id).to.be.eqls(3);
  });
});
