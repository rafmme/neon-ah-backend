import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import sinon from 'sinon';
import app from '../../..';
import db from '../../models';
import { token, tokenTwo, adminToken, invalidToken } from '../mockData/token';
import mockArticles from '../mockData/dummyArticleData';

const { Bookmark, Article } = db;

chai.use(chaiHttp);

describe('Bookmark Model', () => {
  mockArticles[7].userId = '92745c78-7b1a-81e8-9c9c-9d42b21b1a3e';  
  before(async () => {
    await Article.create(mockArticles[7]);
  });
  describe('Create Or Remove Bookmarks', () => {
    it('Should return an error for invalid user', async () => {
      const response = await chai
        .request(app)
        .post(`/api/v1/articles/${mockArticles[7].slug}/bookmark`)
        .set('Authorization', `Bearer ${invalidToken}`)
      expect(response.status).to.eqls(404);
      expect(response.body.status).to.eqls('failure');
      expect(response.body.data.message).to.eqls('User not found');
    });
    it('Should return an error if article is not found', async () => {
      const response = await chai
        .request(app)
        .post(`/api/v1/articles/article/bookmark`)
        .set('Authorization', `Bearer ${token}`)
      expect(response.status).to.eqls(404);
      expect(response.body.status).to.eqls('failure');
      expect(response.body.data.message).to.eqls('Article not found');
    });
    it('Should successfully allow an authenticated user to bookmark an article', async () => {
      const response = await chai
        .request(app)
        .post(`/api/v1/articles/${mockArticles[7].slug}/bookmark`)
        .set('Authorization', `Bearer ${token}`)
      expect(response.status).to.eqls(201);
      expect(response.body.status).to.eqls('success');
      expect(response.body.data.message).to.eqls('You have successfully bookmarked this article');
    });
    it('Should allow a user to successfully remove bookmark', async () => {
      const response = await chai
        .request(app)
        .post(`/api/v1/articles/${mockArticles[7].slug}/bookmark`)
        .set('Authorization', `Bearer ${token}`)
      expect(response.status).to.eqls(200);
      expect(response.body.status).to.eqls('success');
      expect(response.body.data.message).to.eqls('Bookmark removed successfully');
    });
    it('Should successfully allow an authenticated user to bookmark an article again', async () => {
      const response = await chai
        .request(app)
        .post(`/api/v1/articles/${mockArticles[7].slug}/bookmark`)
        .set('Authorization', `Bearer ${token}`)
      expect(response.status).to.eqls(201);
      expect(response.body.status).to.eqls('success');
      expect(response.body.data.message).to.eqls('You have successfully bookmarked this article');
    });
    it('Should handle unexpected errors thrown when creating a bookmark', async () => {
      const stub = sinon
        .stub(Article, 'findOne')
        .callsFake(() => Promise.reject(new Error('Internal Server Error')));

      const response = await chai
        .request(app)
        .post(`/api/v1/articles/${mockArticles[7].slug}/bookmark`)
        .set('Authorization', `Bearer ${token}`)
      expect(response.body.data.statusCode).to.equal(500);
      expect(response.body.data.message).to.equal('Something went wrong on the server');
      stub.restore();
    });
  });

  describe('Get Article Bookmarks', () => {
    it('Should return an error if user is not an admin', async () => {
      const response = await chai
        .request(app)
        .get(`/api/v1/articles/how-to-be-a-10x-dev-sGNYfURm/bookmarks`)
        .set('Authorization', `Bearer ${token}`)
      expect(response.status).to.eqls(401);
      expect(response.body.status).to.eqls('failure');
      expect(response.body.data.message).to.eqls('You are unauthorised to access this page.');
    });
    it('Should return an error if article is not found', async () => {
      const response = await chai
        .request(app)
        .get(`/api/v1/articles/article/bookmarks`)
        .set('Authorization', `Bearer ${adminToken}`)
      console.log('resp::', response.toJSON())
      expect(response.status).to.eqls(404);
      expect(response.body.status).to.eqls('failure');
      expect(response.body.data.message).to.eqls('Article not found');
    });
    it('Should show that an article has not been bookmarked', async () => {
      const response = await chai
        .request(app)
        .get(`/api/v1/articles/how-to-be-a-10x-dev-sGNYfURm/bookmarks`)
        .set('Authorization', `Bearer ${adminToken}`)
        console.log('resp2::', response.toJSON())
      expect(response.status).to.eqls(200);
      expect(response.body.status).to.eqls('success');
      expect(response.body.data.message).to.eqls('This article has not been bookmarked yet');
    });
    it('Should successfully retrieve all bookmarks for an article', async () => {
      const response = await chai
        .request(app)
        .get(`/api/v1/articles/${mockArticles[7].slug}/bookmarks`)
        .set('Authorization', `Bearer ${adminToken}`)
      expect(response.status).to.eqls(200);
      expect(response.body.status).to.eqls('success');
      expect(response.body.data.message).to.eqls('Bookmarks successfully found');
    });
    it('Should handle unexpected errors thrown when getting bookmarks', async () => {
      const stub = sinon
        .stub(Bookmark, 'findAll')
        .callsFake(() => Promise.reject(new Error('Internal Server Error')));

      const response = await chai
        .request(app)
        .get(`/api/v1/articles/${mockArticles[7].slug}/bookmarks`)
        .set('Authorization', `Bearer ${adminToken}`)
      expect(response.body.data.statusCode).to.equal(500);
      expect(response.body.data.message).to.equal('Something went wrong on the server');
      stub.restore();
    });
  });

  describe('Get User Bookmarks', () => {
    it('Should return an error for invalid user', async () => {
      const response = await chai
        .request(app)
        .get('/api/v1/users/bookmarks')
        .set('Authorization', `Bearer ${token}`)
      expect(response.status).to.eqls(404);
      expect(response.body.status).to.eqls('failure');
      expect(response.body.data.message).to.eqls('User not found');
    });
    it('Should show that user has not bookmarked an article yet', async () => {
      const response = await chai
        .request(app)
        .get('/api/v1/user/bookmarks')
        .set('Authorization', `Bearer ${tokenTwo}`)
      expect(response.status).to.eqls(200);
      expect(response.body.status).to.eqls('success');
      expect(response.body.data.message).to.eqls('You have not bookmarked any article yet');
    });
    it('Should successfully retrieve all user bookmarks', async () => {
      const response = await chai
        .request(app)
        .get('/api/v1/user/bookmarks')
        .set('Authorization', `Bearer ${token}`)
      expect(response.status).to.eqls(200);
      expect(response.body.status).to.eqls('success');
      expect(response.body.data.message).to.eqls('Bookmarks successfully found');
    });
  });
})
