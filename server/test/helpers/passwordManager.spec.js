import { expect } from 'chai';
import PasswordManager from '../../helpers/PasswordManager';

describe('Password Manager Utility Class', () => {
  const password = 'password';
  it('It should be able to hash a provided password', async () => {
    const hash = await PasswordManager.hashPassword(password);
    expect(hash).to.be.a('string');
  });
});
