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

const adminToken = TokenManager.sign({
  userId: 'aba396bd-7ac4-42c3-b442-cf10dd73e4f4',
  email: 'kabir@now.com',
  roleId: '3ceb546e-054d-4c1d-8860-e27c209d4ae4'
});

const invalidToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJmZjVhMmQyMC1kMzViLTQzMzUtODQ1NS0zNDdhMGIyMGMwYzEiLCJ1c2VyRW1haWwiOiJib2JAZ21haWwuY29tIiwicm9sZUlkIjoiM2NlYjU0NmUtMDU0ZC00YzFkLTg4NjAtZTI3YzIwOWQ0YWUzIiwiaWF0IjoxNTQ4NjcyMTA3LCJleHAiOjE1ODAyMjk3MDd9.tA72oitrIVJ0lYohgyp_L8QWLaERI53t2L_xWxBAhoc';

export { token, tokenTwo, adminToken, invalidToken };
