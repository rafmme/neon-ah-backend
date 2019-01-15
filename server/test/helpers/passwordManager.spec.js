import { expect } from 'chai';
import passwordManager from '../../helpers/PasswordManager';

describe('It should check password manager', () => {
  const password = 'password';
  it('It should return hashed password', () => {
    const hash = passwordManager.hashPassword(password);
    expect(hash).to.be.a('string');
  });
});
