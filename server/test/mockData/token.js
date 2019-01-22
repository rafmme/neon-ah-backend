import TokenManager from '../../helpers/TokenManager';

const token = TokenManager.sign({
  userId: '45745c60-7b1a-11e8-9c9c-2d42b21b1a3e',
  email: 'jesseinit@now.com',
  roleId: '3ceb546e-054d-4c1d-8860-e27c209d4ae3'
});

const tokenTwo = TokenManager.sign({
  userId: '92745c78-7b1a-81e8-9c9c-9d42b21b1a3e',
  email: 'steve@now.com',
  roleId: '3ceb546e-054d-4c1d-8860-e27c209d4ae3'
});

export { token, tokenTwo };
