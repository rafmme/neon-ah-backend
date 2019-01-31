import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import sinon from 'sinon';
import app from '../../..';
import db from '../../models';
import { token, tokenTwo } from '../mockData/token';

const { Article, Comment } = db;
chai.use(chaiHttp);

describe('Comment Model', () => {
  describe('Create a comment', () => {
    it('It should be able to create a comment', async () => {
      const response = await chai
        .request(app)
        .post('/api/v1/articles/how-to-be-a-10x-dev-sGNYfURm/comments')
        .set('Authorization', `Bearer ${token}`)
        .send({
          content: 'Nice write up'
        });
      expect(response.status).to.eqls(201);
      expect(response.body.status).to.eqls('success');
      expect(response.body.data.message).to.eqls('Comment created');
    });
    it('It should not be able to create a comment when content is empty', async () => {
      const response = await chai
        .request(app)
        .post('/api/v1/articles/how-to-be-a-10x-dev-sGNYfURm/comments')
        .set('Authorization', `Bearer ${token}`)
        .send({
          content: ''
        });
      expect(response.status).to.eqls(422);
    });
    it('It should be able to handle unexpected errors thrown during creating a comment', async () => {
      const stub = sinon
        .stub(Article, 'findOne')
        .callsFake(() => Promise.reject(new Error('Internal Server Error')));

      const response = await chai
        .request(app)
        .post('/api/v1/articles/how-to-be-a-10x-dev-sGNYfURm/comments')
        .set('Authorization', `Bearer ${token}`)
        .send({
          content: 'Nice write up'
        });
      expect(response.body.data.statusCode).to.equal(500);
      stub.restore();
    });
    it('It should return an error with incorrect token', async () => {
      const response = await chai
        .request(app)
        .post('/api/v1/articles/how-to-be-a-10x-dev-sGNYfURm/comments')
        .send({
          content: 'Nice write up'
        });
      expect(response.status).to.equal(401);
      expect(response.body.status).to.equal('failure');
    });
    it('It should return an error when token is expired', async () => {
      const expiredToken = 'jdjdjdjdjdj';
      const response = await chai
        .request(app)
        .post('/api/v1/articles/how-to-be-a-10x-dev-sGNYfURm/comments')
        .set('Authorization', `Bearer ${expiredToken}`)
        .send({
          content: 'Nice write up'
        });
      expect(response.status).to.equal(401);
      expect(response.body.status).to.equal('failure');
    });
  });
  describe('Get comments for an article', () => {
    it('It should be able to get all comments', async () => {
      const response = await chai
        .request(app)
        .get('/api/v1/articles/how-to-be-a-10x-dev-sGNYfURm/comments')
        .set('Authorization', `Bearer ${token}`);
      expect(response.status).to.eqls(200);
      expect(response.body.status).to.eqls('success');
      expect(response.body.data.message).to.eqls('Comment found');
    });

    it('It should be able to get a single comment', async () => {
      const response = await chai
        .request(app)
        .get('/api/v1/articles/how-to-be-a-10x-dev-sGNYfURm/comments/09543c60-7b1a-11e8-9c9c-2d42b21b1a3e')
        .set('Authorization', `Bearer ${token}`);
      expect(response.status).to.eqls(200);
      expect(response.body.status).to.eqls('success');
      expect(response.body.data.message).to.eqls('Comment found');
    });

    it('It should not be able to get a single comment if comment id is wrong', async () => {
      const response = await chai
        .request(app)
        .get('/api/v1/articles/how-to-be-a-10x-dev-sGNYfURm/comments/09543c60-7b1a-11e8-9c9c-2d42b21b1')
        .set('Authorization', `Bearer ${token}`);
      expect(response.status).to.eqls(404);
      expect(response.body.status).to.eqls('failure');
    });

    it('It should throw an error when article id is not found', async () => {
      const response = await chai
        .request(app)
        .get('/api/v1/articles/dhdhdhhdhdhhdhd/comments')
        .set('Authorization', `Bearer ${token}`);
      expect(response.status).to.eqls(404);
      expect(response.body.status).to.eqls('failure');
    });

    it('It should be able to handle unexpected errors thrown when getting a comment', async () => {
      const stub = sinon
        .stub(Article, 'findOne')
        .callsFake(() => Promise.reject(new Error('Internal Server Error')));

      const response = await chai
        .request(app)
        .post('/api/v1/articles/how-to-be-a-10x-dev-sGNYfURm/comments')
        .set('Authorization', `Bearer ${token}`)
        .send({
          content: 'Nice write up'
        });
      expect(response.body.data.statusCode).to.equal(500);
      stub.restore();
    });
  });

  describe('Update comment', () => {
    it('It should not be able to update a comment created by another user', async () => {
      const response = await chai
        .request(app)
        .put('/api/v1/articles/how-to-be-a-10x-dev-sGNYfURm/comments/09543c60-7b1a-11e8-9c9c-2d42b21b1a3e')
        .set('Authorization', `Bearer ${tokenTwo}`)
        .send({
          content: 'Nice write up here'
        });
      expect(response.status).to.eqls(403);
      expect(response.body.status).to.eqls('failure');
      expect(response.body.data.message).to.eqls('You are not allowed to update another user\'s comment');
    });

    it('It should be able to update a comment created by only a user', async () => {
      const response = await chai
        .request(app)
        .put('/api/v1/articles/how-to-be-a-10x-dev-sGNYfURm/comments/09543c60-7b1a-11e8-9c9c-2d42b21b1a3e')
        .set('Authorization', `Bearer ${token}`)
        .send({
          content: 'Nice write up'
        });
      expect(response.status).to.eqls(200);
      expect(response.body.status).to.eqls('success');
      expect(response.body.data.message).to.eqls('Comment updated');
    });

    it('It should throw an error when you want to update a comment when comment id is wrong', async () => {
      const response = await chai
        .request(app)
        .put('/api/v1/articles/how-to-be-a-10x-dev-sGNYfURm/comments/09543c60-7b1a-11e8-9c9c-2d42b21')
        .set('Authorization', `Bearer ${token}`)
        .send({
          content: 'Nice write up'
        });
      expect(response.status).to.eqls(404);
      expect(response.body.status).to.eqls('failure');
    });

    it('It should be able to handle unexpected errors thrown during updating a comment', async () => {
      const stub = sinon
        .stub(Comment, 'findOne')
        .callsFake(() => Promise.reject(new Error('Internal Server Error')));

      const response = await chai
        .request(app)
        .put('/api/v1/articles/how-to-be-a-10x-dev-sGNYfURm/comments/09543c60-7b1a-11e8-9c9c-2d42b21b1')
        .set('Authorization', `Bearer ${token}`)
        .send({
          content: 'Nice write up'
        });
      expect(response.body.data.statusCode).to.equal(500);
      stub.restore();
    });

    it('It should not be able to update a comment when article id dont exist', async () => {
      const response = await chai
        .request(app)
        .put('/api/v1/articles/95745c60-7b1a-11e8-9c9c-2d42b21b1a/comments/09543c60-7b1a-11e8-9c9c-2d42b21b1a3e')
        .set('Authorization', `Bearer ${token}`)
        .send({
          content: 'Nice write up'
        });
      expect(response.status).to.eqls(404);
      expect(response.body.status).to.eqls('failure');
      expect(response.body.data.message).to.eqls('Article not found');
    });
  });
  describe('Delete comment', () => {
    it('It should not be able to delete a comment created by another user', async () => {
      const response = await chai
        .request(app)
        .delete('/api/v1/articles/how-to-be-a-10x-dev-sGNYfURm/comments/09543c60-7b1a-11e8-9c9c-2d42b21b1a3e')
        .set('Authorization', `Bearer ${tokenTwo}`);
      expect(response.status).to.eqls(403);
      expect(response.body.status).to.eqls('failure');
      expect(response.body.data.message).to.eqls('You are not allowed to delete another user\'s comment');
    });

    it('It should not be able to delete a comment when article has no comment', async () => {
      const response = await chai
        .request(app)
        .delete('/api/v1/articles/95745c60-7b1a-11e8-9c9c-2d42b21b1a/comments/09543c60-7b1a-11e8-9c9c-2d42b21b1a3e')
        .set('Authorization', `Bearer ${token}`);
      expect(response.status).to.eqls(404);
      expect(response.body.status).to.eqls('failure');
    });

    it('It should not be able to delete a comment when comment id is wrong', async () => {
      const response = await chai
        .request(app)
        .delete('/api/v1/articles/how-to-be-a-10x-dev-sGNYfURm/comments/09543c60-7b1a-11e8-9c9c-2d42b21b')
        .set('Authorization', `Bearer ${token}`);
      expect(response.status).to.eqls(404);
      expect(response.body.status).to.eqls('failure');
    });

    it('It should be able to delete a comment created by only a user', async () => {
      const response = await chai
        .request(app)
        .delete('/api/v1/articles/how-to-be-a-10x-dev-sGNYfURm/comments/09543c60-7b1a-11e8-9c9c-2d42b21b1a3e')
        .set('Authorization', `Bearer ${token}`);
      expect(response.status).to.eqls(200);
      expect(response.body.status).to.eqls('success');
      expect(response.body.data.message).to.eqls('Comment deleted');
    });

    it('It should be able to handle unexpected errors thrown during deleting a comment', async () => {
      const stub = sinon
        .stub(Comment, 'findOne')
        .callsFake(() => Promise.reject(new Error('Internal Server Error')));

      const response = await chai
        .request(app)
        .delete('/api/v1/articles/how-to-be-a-10x-dev-sGNYfURm/comments/09543c60-7b1a-11e8-9c9c-2d42b21b1')
        .set('Authorization', `Bearer ${token}`)
        .send({
          content: 'Nice write up'
        });
      expect(response.body.data.statusCode).to.equal(500);
      stub.restore();
    });
  });
});
