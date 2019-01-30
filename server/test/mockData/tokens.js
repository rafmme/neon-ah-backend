import dotenv from 'dotenv';
import TokenManager from '../../helpers/TokenManager';

dotenv.config();

const userToken = TokenManager.sign({
  userId: '45745c60-7b1a-11e8-9c9c-2d42b21b1a3e',
  fullName: 'Jesse',
  userName: 'jesseinit',
  email: 'jesseinit@now.com'
});

const userToken2 = TokenManager.sign({
  userId: 'aba396bd-7ac4-42c3-b442-cf10dd73e4f4',
  fullName: 'Kabir Alausa',
  userName: 'kabir',
  email: 'kabir@now.com'
});

const nonExistingUserToken = TokenManager.sign({
  userId: 'aba396bd-7ac4-42c3-b442-cf10dd63e4f4',
  fullName: 'Kabir Alausa',
  userName: 'kabir',
  email: 'kabir@now.com',
  bio: 'Learning life now',
  password: 'Blahblah',
  authTypeId: '15745c60-7b1a-11e8-9c9c-2d42b21b1a3e'
});

const superAdminToken = TokenManager.sign({
  id: 'b9aef994-d8ea-4b42-88be-999d57d68891',
  fullName: process.env.SUPER_ADMIN_FULLNAME,
  userName: process.env.SUPER_ADMIN_USERNAME,
  email: process.env.SUPER_ADMIN_EMAIL,
  password: process.env.SUPER_ADMIN_PASSWORD,
  authTypeId: process.env.SUPER_ADMIN_AUTHTYPEID,
  roleId: process.env.SUPER_ADMIN_ROLE_ID,
  isVerified: true
});

const invalidToken = 'ehrh uhto  h gohoeh';

export {
  userToken, userToken2, invalidToken, nonExistingUserToken, superAdminToken
};
