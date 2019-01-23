import chai, { expect } from 'chai';
import app from '../../../index';
// import authManager from '../../middlewares/AuthManager';
// import tokenManager from '../../helpers/TokenManager';


describe('Checks if user is authorized', () => {
  // const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI0NTc0NWM2MC03YjFhLTExZTgtOWM5Yy0yZDQyYjIxYjFhM2UiLCJ1c2VyRW1haWwiOiJqZXNzZWluaXRAbm93LmNvbSIsInJvbGVJZCI6IjNjZWI1NDZlLTA1NGQtNGMxZC04ODYwLWUyN2MyMDlkNGFlMyIsImlhdCI6MTU0ODAxOTUyMCwiZXhwIjoxNTc5MTIzNTIwfQ.Bw4qjXM4bTQGW4GWwiOIr_iIJHhP7JWvquwvC8P0AhM';
  const wrongToken = 'eyJhbGciiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsInVzZXJFbWFpbCI6ImpvaG5kb2VAZ21haWwuY29tIiwicm9sZUlkIjoxLCJpYXQiOjE1NDc3NzUwNDksImV4cCI6MTU3ODg3OTA0OX0.exVeYMgY1OS7tqf3imCZp4norp5dxtbjh0p2olUxtuM';

  it('should return error for wrong token', async () => {
    const response = await chai
      .request(app)
      .post('/api/v1/articles/What-a-mighy-God/likes')
      .set(
        'authorization', wrongToken
      );
    expect(response.status).to.equal(403);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('data');
    expect(response.body.data).to.be.an('object');
    expect(response.body.data).to.have.property('message');
    expect(response.body.data.message).to.be.a('string');
    expect(response.body.data.message).to.be.eql(
      'User not Authorised!'
    );
  });
});
