import TokenManager from '../../helpers/TokenManager';

const userToken = TokenManager.sign({
  userId: '45745c60-7b1a-11e8-9c9c-2d42b21b1a3e',
  fullName: 'Jesse',
  userName: 'jesseinit',
  email: 'jesseinit@now.com',
  bio: 'Gitting Started',
  password: 'Blahblah',
  authTypeId: '15745c60-7b1a-11e8-9c9c-2d42b21b1a3e'
});

const userToken2 = TokenManager.sign({
  userId: 'aba396bd-7ac4-42c3-b442-cf10dd73e4f4',
  fullName: 'Kabir Alausa',
  userName: 'kabir',
  email: 'kabir@now.com',
  bio: 'Learning life now',
  password: 'Blahblah',
  authTypeId: '15745c60-7b1a-11e8-9c9c-2d42b21b1a3e'
});



const invalidToken = 'ehrh uhto  h gohoeh';

export {
  userToken,
  userToken2,
  invalidToken,
};
