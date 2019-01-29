import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../../..';
import db from '../../models';
import { userToken, userToken2, invalidToken } from '../mockData/tokens'

const { ArticleLikesDislike } = db;

chai.use(chaiHttp);

describe('Likes and Dislike feature', () => {
  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI0NTc0NWM2MC03YjFhLTExZTgtOWM5Yy0yZDQyYjIxYjFhM2UiLCJ1c2VyRW1haWwiOiJqZXNzZWluaXRAbm93LmNvbSIsInJvbGVJZCI6IjNjZWI1NDZlLTA1NGQtNGMxZC04ODYwLWUyN2MyMDlkNGFlMyIsImlhdCI6MTU0ODAxOTUyMCwiZXhwIjoxNTc5MTIzNTIwfQ.Bw4qjXM4bTQGW4GWwiOIr_iIJHhP7JWvquwvC8P0AhM';
  describe('User can like articles', () => {
    it('should return error for article not found', async () => {
      const response = await chai
        .request(app)
        .post('/api/v1/articles/What-a-mighy-God/likes')
        .set('authorization', token);
      expect(response.status).to.equal(404);
      expect(response.body.data).to.have.property('message');
      expect(response.body.data.message).to.be.a('string');
      expect(response.body.data.message).to.be.eql('Article Not Found');
      expect(response.body.data).to.have.property('statusCode');
      expect(response.body.data.statusCode).to.be.a('Number');
      expect(response.body.status).to.equal('failure');
    });

    it('like articles', async () => {
      const response = await chai
        .request(app)
        .post('/api/v1/articles/how-to-say-hello-in-2019/likes')
        .set('authorization', token);
      expect(response.status).to.equal(200);
      expect(response.body.data).to.have.property('message');
      expect(response.body.data.message).to.be.a('string');
      expect(response.body.data.message).to.be.eql('You just liked this article!');
      expect(response.body.data).to.have.property('statusCode');
      expect(response.body.data.statusCode).to.be.a('Number');
      expect(response.body.status).to.equal('success');
    });

    it('unlike articles', async () => {
      const response = await chai
        .request(app)
        .post('/api/v1/articles/how-to-say-hello-in-2019/likes')
        .set('authorization', token);
      expect(response.status).to.equal(200);
      expect(response.body.data).to.have.property('message');
      expect(response.body.data.message).to.be.a('string');
      expect(response.body.data.message).to.be.eql('You just unliked this article!');
      expect(response.body.data).to.have.property('statusCode');
      expect(response.body.data.statusCode).to.be.a('Number');
      expect(response.body.status).to.equal('success');
    });
  });

  describe('Comment Like and Unlike', () => {
    it('should return error for comment not found', async () => {
      const response = await chai
        .request(app)
        .post('/api/v1/articles/how-to-be-a-10x-dev-sGNYfURm/comments/09543c60-7b1a-11e8-9c9c-2d42b21b1a3f/likes')
        .set('authorization', `Bearer ${userToken}`);
      expect(response.status).to.equal(404);
      expect(response.body.data).to.have.property('message');
      expect(response.body.data.message).to.be.a('string');
      expect(response.body.data.message).to.be.eql('Comment not found');
      expect(response.body.data).to.have.property('statusCode');
      expect(response.body.data.statusCode).to.be.a('Number');
      expect(response.body.status).to.equal('failure');
    });

    it('Correct message when comment has no likes', async () => {
      const response = await chai
        .request(app)
        .get('/api/v1/articles/how-to-google-in-2019/comments/09543c60-7b1a-11e8-9c9c-2d42b21b1a31/likes')
        .set('authorization', `Bearer ${userToken}`);
      expect(response.status).to.equal(404);
      expect(response.body.data).to.have.property('message');
      expect(response.body.data.message).to.be.a('string');
      expect(response.body.data.message).to.be.eql('No likes for this comment');
      expect(response.body.data).to.have.property('statusCode');
      expect(response.body.data.statusCode).to.be.a('Number');
      expect(response.body.status).to.equal('failure');
    });

    it('like comment', async () => {
      const response = await chai
        .request(app)
        .post('/api/v1/articles/how-to-google-in-2019/comments/09543c60-7b1a-11e8-9c9c-2d42b21b1a31/likes')
        .set('authorization', `Bearer ${userToken}`);
      expect(response.status).to.equal(200);
      expect(response.body.data).to.have.property('message');
      expect(response.body.data.message).to.be.a('string');
      expect(response.body.data.message).to.be.eql('You just liked this comment');
      expect(response.body.data).to.have.property('statusCode');
      expect(response.body.data.statusCode).to.be.a('Number');
      expect(response.body.status).to.equal('success');
    });

    it('Correct message when comment has likes', async () => {
      const response = await chai
        .request(app)
        .get('/api/v1/articles/how-to-google-in-2019/comments/09543c60-7b1a-11e8-9c9c-2d42b21b1a31/likes')
        .set('authorization', `Bearer ${userToken}`);
      expect(response.status).to.equal(200);
      expect(response.body.data).to.have.property('message');
      expect(response.body.data.message).to.be.a('string');
      expect(response.body.data).to.have.property('statusCode');
      expect(response.body.data.statusCode).to.be.a('Number');
      expect(response.body.status).to.equal('success');
    });

    it('unlike comment', async () => {
      const response = await chai
        .request(app)
        .post('/api/v1/articles/how-to-google-in-2019/comments/09543c60-7b1a-11e8-9c9c-2d42b21b1a31/likes')
        .set('authorization', `Bearer ${userToken}`);
      expect(response.status).to.equal(200);
      expect(response.body.data).to.have.property('message');
      expect(response.body.data.message).to.be.a('string');
      expect(response.body.data.message).to.be.eql('You just unliked this comment');
      expect(response.body.data).to.have.property('statusCode');
      expect(response.body.data.statusCode).to.be.a('Number');
      expect(response.body.status).to.equal('success');
    });
  });
});
