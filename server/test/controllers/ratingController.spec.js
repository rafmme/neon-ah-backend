import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import sinon from 'sinon';
import app from '../../..';
import db from '../../models';
import {
  token, tokenTwo
} from '../mockData/token';
import ArticleHelper from '../../helpers/ArticleHelper';
import mockArticles from '../mockData/dummyArticleData';

const { Rating, Article } = db;

chai.use(chaiHttp);

describe('Rating Model', () => {
  mockArticles[2].userId = '92745c78-7b1a-81e8-9c9c-9d42b21b1a3e';
  mockArticles[2].slug = ArticleHelper.generateArticleSlug(mockArticles[2].title);
  mockArticles[2].id = 'b78f1f17-acf5-4dc2-b856-d21ecb29de29'
  const sampleSlug = 'how-to-be-a-10x-dev-sGNYfURm';
  const invalidToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJmZjVhMmQyMC1kMzViLTQzMzUtODQ1NS0zNDdhMGIyMGMwYzEiLCJ1c2VyRW1haWwiOiJib2JAZ21haWwuY29tIiwicm9sZUlkIjoiM2NlYjU0NmUtMDU0ZC00YzFkLTg4NjAtZTI3YzIwOWQ0YWUzIiwiaWF0IjoxNTQ4NjcyMTA3LCJleHAiOjE1ODAyMjk3MDd9.tA72oitrIVJ0lYohgyp_L8QWLaERI53t2L_xWxBAhoc'

  before(async () => {
    await Article.create(mockArticles[2]);
    await Rating.create({
      rating: 4,
      articleId: mockArticles[2].id,
      userId: '45745c60-7b1a-11e8-9c9c-2d42b21b1a3e'
    });
  });

  describe('Get Article Ratings', () => {
    it('Should return an error for invalid user', async () => {
      const response = await chai
        .request(app)
        .get(`/api/v1/articles/${sampleSlug}/ratings`)
        .set('Authorization', `Bearer ${invalidToken}`)
      expect(response.status).to.eqls(404);
      expect(response.body.status).to.eqls('failure');
      expect(response.body.data.message).to.eqls('User not found');
    });
    it('Should return an error if article is not found', async () => {
      const response = await chai
        .request(app)
        .get('/api/v1/articles/article/ratings')
        .set('Authorization', `Bearer ${token}`)
      expect(response.status).to.eqls(404);
      expect(response.body.status).to.eqls('failure');
      expect(response.body.data.message).to.eqls('Article not found');
    });
    it('Should show that an article has not been rated', async () => {
      const response = await chai
        .request(app)
        .get(`/api/v1/articles/${sampleSlug}/ratings`)
        .set('Authorization', `Bearer ${token}`)
      expect(response.status).to.eqls(200);
      expect(response.body.status).to.eqls('success');
      expect(response.body.data.message).to.eqls('This article has not been rated');
    });
    it('Should successfully retrieve all ratings for an article', async () => {
      const response = await chai
        .request(app)
        .get(`/api/v1/articles/${mockArticles[2].slug}/ratings`)
        .set('Authorization', `Bearer ${token}`)
      expect(response.status).to.eqls(200);
      expect(response.body.status).to.eqls('success');
      expect(response.body.data.message).to.eqls('Ratings successfully found');
    });
    it('Should handle unexpected errors thrown when getting ratings', async () => {
      const stub = sinon
        .stub(Rating, 'findAll')
        .callsFake(() => Promise.reject(new Error('Internal Server Error')));

      const response = await chai
        .request(app)
        .get(`/api/v1/articles/${mockArticles[2].slug}/ratings`)
        .set('Authorization', `Bearer ${token}`)
      expect(response.body.data.statusCode).to.equal(500);
      stub.restore();
    });

  });

  describe('Get User Ratings', () => {
    it('Should return an error for invalid user', async () => {
      const response = await chai
        .request(app)
        .get('/api/v1/user/ratings')
        .set('Authorization', `Bearer ${invalidToken}`)
      expect(response.status).to.eqls(404);
      expect(response.body.status).to.eqls('failure');
      expect(response.body.data.message).to.eqls('User not found');
    });
    it('Should show that user has not rated an article yet', async () => {
      const response = await chai
        .request(app)
        .get('/api/v1/user/ratings')
        .set('Authorization', `Bearer ${tokenTwo}`)
      expect(response.status).to.eqls(200);
      expect(response.body.status).to.eqls('success');
      expect(response.body.data.message).to.eqls('You have not rated any article yet');
    });
    it('Should successfully retrieve all user ratings', async () => {
      const response = await chai
        .request(app)
        .get('/api/v1/user/ratings')
        .set('Authorization', `Bearer ${token}`)
      expect(response.status).to.eqls(200);
      expect(response.body.status).to.eqls('success');
      expect(response.body.data.message).to.eqls('Ratings successfully found');
    });
    it('Should handle unexpected errors thrown when retrieving ratings', async () => {
      const stub = sinon
        .stub(Rating, 'findAll')
        .callsFake(() => Promise.reject(new Error('Internal Server Error')));

      const response = await chai
        .request(app)
        .get(`/api/v1/user/ratings`)
        .set('Authorization', `Bearer ${token}`)
      expect(response.body.data.statusCode).to.equal(500);
      stub.restore();
    });
  });

  describe('UpdateOrCreate Ratings', () => {
    it('Should return an error for invalid user', async () => {
      const response = await chai
        .request(app)
        .put(`/api/v1/articles/${mockArticles[2].slug}/rating`)
        .set('Authorization', `Bearer ${invalidToken}`)
      expect(response.status).to.eqls(404);
      expect(response.body.status).to.eqls('failure');
      expect(response.body.data.message).to.eqls('User not found');
    });
    it('Should return an error for invalid article', async () => {
      const response = await chai
        .request(app)
        .put(`/api/v1/articles/invalidArticle/rating`)
        .set('Authorization', `Bearer ${token}`)
        .send({
          rating: '5'
        });
      expect(response.status).to.eqls(404);
      expect(response.body.status).to.eqls('failure');
      expect(response.body.data.message).to.eqls('Article not found');
    });
    it('Should return an error when rating is not provided', async () => {
      const response = await chai
        .request(app)
        .put(`/api/v1/articles/${mockArticles[2].slug}/rating`)
        .set('Authorization', `Bearer ${token}`)
      expect(response.status).to.eqls(400);
      expect(response.body.status).to.eqls('failure');
      expect(response.body.data.message).to.eqls('Please provide a rating');
    });
    it('Should return an error for invalid rating', async () => {
      const response = await chai
        .request(app)
        .put(`/api/v1/articles/${mockArticles[2].slug}/rating`)
        .set('Authorization', `Bearer ${token}`)
        .send({
          rating: 'e'
        });
      expect(response.status).to.eqls(400);
      expect(response.body.status).to.eqls('failure');
      expect(response.body.data.message).to.eqls('Rating should be between 1 and 5');
    });
    it('Should not allow user to rate own article', async () => {
      const response = await chai
        .request(app)
        .put(`/api/v1/articles/${sampleSlug}/rating`)
        .set('Authorization', `Bearer ${token}`)
        .send({
          rating: 5
        });
      expect(response.status).to.eqls(403);
      expect(response.body.status).to.eqls('failure');
      expect(response.body.data.message).to.eqls('You cannot rate your own article');
    });
    it('Should successfully allow a user to update a rating if it exists', async () => {
      const response = await chai
        .request(app)
        .put(`/api/v1/articles/${mockArticles[2].slug}/rating`)
        .set('Authorization', `Bearer ${token}`)
        .send({
          rating: 1
        });
      expect(response.status).to.eqls(200);
      expect(response.body.status).to.eqls('success');
      expect(response.body.data.message).to.eqls('You have successfully updated your rating');
    });
    it('Should successfully allow a user to create a rating if it does not exist', async () => {
      const response = await chai
        .request(app)
        .put(`/api/v1/articles/${sampleSlug}/rating`)
        .set('Authorization', `Bearer ${tokenTwo}`)
        .send({
          rating: 1
        });
      expect(response.status).to.eqls(201);
      expect(response.body.status).to.eqls('success');
      expect(response.body.data.message).to.eqls('You have successfully rated this article');
    });
    it('Should return a message when the rating is not updated', async () => {
      const response = await chai
        .request(app)
        .put(`/api/v1/articles/${mockArticles[2].slug}/rating`)
        .set('Authorization', `Bearer ${token}`)
        .send({
          rating: 1
        });
      expect(response.status).to.eqls(200);
      expect(response.body.status).to.eqls('success');
      expect(response.body.data.message).to.eqls('You did not update the rating');
    });
    it('Should handle unexpected errors thrown when updating or creating ratings', async () => {
      const stub = sinon
        .stub(Rating, 'findOne')
        .callsFake(() => Promise.reject(new Error('Internal Server Error')));

      const response = await chai
        .request(app)
        .put(`/api/v1/articles/${mockArticles[2].slug}/rating`)
        .set('Authorization', `Bearer ${token}`)
        .send({
          rating: 5
        });
      expect(response.body.data.statusCode).to.equal(500);
      stub.restore();
    });
  });

  describe('Delete Ratings', () => {
    it('Should return an error for invalid article', async () => {
      const response = await chai
        .request(app)
        .delete(`/api/v1/articles/invalidArticle/rating`)
        .set('Authorization', `Bearer ${token}`)
      expect(response.status).to.eqls(404);
      expect(response.body.status).to.eqls('failure');
      expect(response.body.data.message).to.eqls('Article not found');
    });
    it('Should successfully allow a user to delete his rating', async () => {
      const response = await chai
        .request(app)
        .delete(`/api/v1/articles/${sampleSlug}/rating`)
        .set('Authorization', `Bearer ${tokenTwo}`)
      expect(response.status).to.eqls(200);
      expect(response.body.status).to.eqls('success');
      expect(response.body.data.message).to.eqls('Rating deleted successfully');
    });
    it('Should return an error for invalid rating', async () => {
      const response = await chai
        .request(app)
        .delete(`/api/v1/articles/${sampleSlug}/rating`)
        .set('Authorization', `Bearer ${tokenTwo}`)
      expect(response.status).to.eqls(404);
      expect(response.body.status).to.eqls('failure');
      expect(response.body.data.message).to.eqls('Rating not found');
    });
  });
})
