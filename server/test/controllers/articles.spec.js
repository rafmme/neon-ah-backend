import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import sinon from 'sinon';
import app from '../../..';
import db from '../../models';
import { userToken, userToken2, invalidToken } from '../mockData/tokens';
import mockArticles from '../mockData/dummyArticleData';

const { Article } = db;

chai.use(chaiHttp);
chai.should();

describe('API endpoint /articles/', () => {
  let newArticleSlug;

  describe('POST an article', () => {
    it('should successfully create a new article', async () => {
      const response = await chai
        .request(app)
        .post('/api/v1/articles')
        .set({ authorization: `Bearer ${userToken}` })
        .send(mockArticles[1]);

      expect(response.status).to.eqls(201);
      expect(response.body.status).to.eqls('success');
      expect(response.body.data.message).to.eqls('New article has been successfully created');
      newArticleSlug = response.body.data.payload.slug;
    });

    it('It should not allow duplication of article content', async () => {
      const response = await chai
        .request(app)
        .post('/api/v1/articles')
        .set({ authorization: `Bearer ${userToken}` })
        .send(mockArticles[1]);

      expect(response.status).to.eqls(409);
      expect(response.body.status).to.eqls('failure');
      expect(response.body.data.message).to.eqls('conflict error');
    });

    it('It should check for bad banner url', async () => {
      const response = await chai
        .request(app)
        .post('/api/v1/articles')
        .set({ authorization: `Bearer ${userToken}` })
        .send(mockArticles[2]);

      expect(response.status).to.eqls(400);
      expect(response.body.status).to.eqls('failure');
      expect(response.body.data.message).to.eqls('Field validation error');
    });

    it('It should not allow unauthenticated users to post article', async () => {
      const response = await chai
        .request(app)
        .post('/api/v1/articles')
        .set({ authorization: `Bearer ${invalidToken}` })
        .send(mockArticles[1]);

      expect(response.status).to.eqls(401);
      expect(response.body.status).to.eqls('failure');
      expect(response.body.data.message).to.eqls(
        'You need to log in again.'
      );
    });

    it('It should not allow user with invalid token to post an article', async () => {
      const response = await chai
        .request(app)
        .post('/api/v1/articles')
        .send(mockArticles[1]);

      expect(response.status).to.eqls(401);
      expect(response.body.status).to.eqls('failure');
      expect(response.body.data.message).to.eqls('You are not logged in.');
    });

    it('It should show validation error if empty data is passed', async () => {
      const response = await chai
        .request(app)
        .post('/api/v1/articles')
        .set({ authorization: `Bearer ${userToken}` })
        .send(mockArticles[0]);

      expect(response.status).to.eqls(400);
      expect(response.body.status).to.eqls('failure');
      expect(response.body.data.message).to.eqls('Field validation error');
    });
  });

  describe('GET all articles', () => {
    it('should successfully return list of all articles', async () => {
      const response = await chai.request(app).get('/api/v1/articles');

      expect(response.status).to.eqls(200);
      expect(response.body.status).to.eqls('success');
      expect(response.body.data.message).to.eqls('All articles');
    });

    it('should return a list of articles on the next page given a page limit', async () => {
      const response = await chai.request(app).get('/api/v1/articles??page=2&limit=1');

      expect(response.status).to.eqls(200);
      expect(response.body.status).to.eqls('success');
      expect(response.body.data.payload.articles).to.be.an('Array');
    });

    it('should return error value passed to the limit is not a number', async () => {
      const response = await chai.request(app).get('/api/v1/articles?page=2&limit=a');

      expect(response.status).to.eqls(400);
      expect(response.body.status).to.eqls('failure');
      expect(response.body.data.message).to.eqls('There was an issue with your query');
    });

    it('should return error value passed to the page is not a number', async () => {
      const response = await chai.request(app).get('/api/v1/articles?page=a&limit=1');

      expect(response.status).to.eqls(400);
      expect(response.body.status).to.eqls('failure');
      expect(response.body.data.message).to.eqls('There was an issue with your query');
    });

    it('It should be able to handle unexpected errors thrown when creating articles', async () => {
      const stub = sinon
        .stub(Article, 'findAll')
        .callsFake(() => Promise.reject(new Error('Internal Server Error')));

      const response = await chai
        .request(app)
        .get('/api/v1/articles')
        .send();
      expect(response.status).to.equal(500);
      expect(response.body.status).to.eqls('failure');
      expect(response.body.data.message).to.eqls('server error');
      stub.restore();
    });
  });

  describe('GET one article', () => {
    it('should successfully return an article with the specified slug', async () => {
      const response = await chai.request(app).get('/api/v1/articles/What-a-mighty-God');

      expect(response.status).to.eqls(200);
      expect(response.body.status).to.eqls('success');
      expect(response.body.data.message).to.eqls('Article was fetched successfully');
    });

    it('should return not found if article does not exist', async () => {
      const response = await chai.request(app).get('/api/v1/articles/jwt-key-use-case-2');

      expect(response.status).to.eqls(404);
      expect(response.body.status).to.eqls('failure');
      expect(response.body.data.message).to.eqls('not found error');
    });

    it('It should be able to handle unexpected errors thrown when fetching one article', async () => {
      const stub = sinon
        .stub(Article, 'findOne')
        .callsFake(() => Promise.reject(new Error('Internal Server Error')));

      const response = await chai
        .request(app)
        .get('/api/v1/articles/What-a-mighty-God')
        .send();
      expect(response.status).to.equal(500);
      expect(response.body.status).to.eqls('failure');
      expect(response.body.data.message).to.eqls('server error');
      stub.restore();
    });
  });

  describe('UPDATE an article', () => {
    it('should successfully update an article with the specified slug', async () => {
      const response = await chai
        .request(app)
        .put('/api/v1/articles/What-a-mighty-God')
        .set({ authorization: `Bearer ${userToken}` })
        .send(mockArticles[4]);

      expect(response.status).to.eqls(200);
      expect(response.body.status).to.eqls('success');
      expect(response.body.data.message).to.eqls('Article was updated successfully');
    });

    it("should not allow another user update story that isn't there own", async () => {
      const response = await chai
        .request(app)
        .put(`/api/v1/articles/${newArticleSlug}`)
        .set({ authorization: `Bearer ${userToken2}` })
        .send(mockArticles[4]);

      expect(response.status).to.eqls(403);
      expect(response.body.status).to.eqls('failure');
      expect(response.body.data.message).to.eqls('authorization error');
    });

    it('It should not allow unauthenticated users to update article', async () => {
      const response = await chai
        .request(app)
        .put('/api/v1/articles/jwt-key-use-case-2')
        .send(mockArticles[4]);

      expect(response.status).to.eqls(401);
      expect(response.body.status).to.eqls('failure');
      expect(response.body.data.message).to.eqls('You are not logged in.');
    });

    it('should return not found if article does not exist', async () => {
      const response = await chai
        .request(app)
        .put('/api/v1/articles/jwt-key-use-case-2')
        .set({ authorization: `Bearer ${userToken}` });

      expect(response.status).to.eqls(404);
      expect(response.body.status).to.eqls('failure');
      expect(response.body.data.message).to.eqls('not found error');
    });

    it('It should be able to handle unexpected errors thrown when updating one article', async () => {
      const stub = sinon
        .stub(Article, 'findOne')
        .callsFake(() => Promise.reject(new Error('Internal Server Error')));

      const response = await chai
        .request(app)
        .put('/api/v1/articles/What-a-mighty-God')
        .set({ authorization: `Bearer ${userToken}` })
        .send();
      expect(response.status).to.equal(500);
      expect(response.body.status).to.eqls('failure');
      expect(response.body.data.message).to.eqls('server error');
      stub.restore();
    });
  });

  describe('DELETE an article', () => {
    it('should successfully delete an article with the specified slug', async () => {
      const response = await chai
        .request(app)
        .delete('/api/v1/articles/how-to-google-in-2019')
        .set('authorization', `Bearer ${userToken}`);

      expect(response.status).to.eqls(200);
      expect(response.body.status).to.eqls('success');
      expect(response.body.data.message).to.eqls('Article was deleted successfully');
    });

    it('It should not allow unauthenticated users to delete article', async () => {
      const response = await chai.request(app).delete('/api/v1/articles/What-a-mighty-God');

      expect(response.status).to.eqls(401);
      expect(response.body.status).to.eqls('failure');
      expect(response.body.data.message).to.eqls('You are not logged in.');
    });

    it('should return not found if article does not exist', async () => {
      const response = await chai
        .request(app)
        .delete('/api/v1/articles/jwt-key-use-case-2')
        .set('Authorization', `Bearer ${userToken}`);

      expect(response.status).to.eqls(404);
      expect(response.body.status).to.eqls('failure');
      expect(response.body.data.message).to.eqls('not found error');
    });
  });

  describe('SHARE an article', () => {
    it('should successfully share an article with the specified slug', async () => {
      const response = await chai
        .request(app)
        .get('/api/v1/articles/share/how-to-be-a-10x-dev-sGNYfURm?platform=twitter');

      expect(response.status).to.eqls(200);
    });

    it('should return not found if article does not exist', async () => {
      const response = await chai
        .request(app)
        .get('/api/v1/articles/share/jwt-key-use-case-2?platform=whatsapp');

      expect(response.status).to.eqls(404);
      expect(response.body.status).to.eqls('failure');
      expect(response.body.data.message).to.eqls('not found error');
    });

    it('should return bad request if no social media platform is specified', async () => {
      const response = await chai
        .request(app)
        .get('/api/v1/articles/share/how-to-be-a-10x-dev-sGNYfURm?platform');

      expect(response.status).to.eqls(400);
      expect(response.body.status).to.eqls('failure');
      expect(response.body.data.message).to.eqls('bad request error');
    });
  });
});

describe('API endpoint /myArticles', () => {
  describe('GET /myArticles', () => {
    it('should successfully get all articles of a particular user', async () => {
      const response = await chai
        .request(app)
        .get('/api/v1/myArticles')
        .set('Authorization', `Bearer ${userToken}`);

      expect(response.status).to.eqls(200);
      expect(response.body.status).to.eqls('success');
      expect(response.body.data.message).to.eqls('All User articles');
    });

    it('should successfully get all unpublished articles of a user', async () => {
      const response = await chai
        .request(app)
        .get('/api/v1/myArticles?drafts')
        .set('Authorization', `Bearer ${userToken}`);

      expect(response.status).to.eqls(200);
      expect(response.body.status).to.eqls('success');
      expect(response.body.data.message).to.eqls('All User articles');
    });

    it('should successfully get all published articles of a user', async () => {
      const response = await chai
        .request(app)
        .get('/api/v1/myArticles?published')
        .set('Authorization', `Bearer ${userToken}`);

      expect(response.status).to.eqls(200);
      expect(response.body.status).to.eqls('success');
      expect(response.body.data.message).to.eqls('All User articles');
    });

    it("should filter a user's articles by tag", async () => {
      const response = await chai
        .request(app)
        .get('/api/v1/myArticles?tag=welcome')
        .set('Authorization', `Bearer ${userToken}`);

      expect(response.status).to.eqls(200);
      expect(response.body.status).to.eqls('success');
      expect(response.body.data.message).to.eqls('All User articles');
    });

    it("It should be able to handle unexpected errors thrown when getting all user's articles", async () => {
      const stub = sinon
        .stub(Article, 'findAll')
        .callsFake(() => Promise.reject(new Error('Internal Server Error')));

      const response = await chai
        .request(app)
        .get('/api/v1/myArticles')
        .set('Authorization', `Bearer ${userToken}`);

      expect(response.status).to.equal(500);
      expect(response.body.status).to.eqls('failure');
      expect(response.body.data.message).to.eqls('server error');
      stub.restore();
    });
  });

  describe('GET /myArticles/:slug', () => {
    it('should successfully return an article of a user with the specified slug', async () => {
      const response = await chai
        .request(app)
        .get('/api/v1/myArticles/how-to-say-hello-in-2019')
        .set('Authorization', `Bearer ${userToken}`);

      expect(response.status).to.eqls(200);
      expect(response.body.status).to.eqls('success');
      expect(response.body.data.message).to.eqls('Article was fetched successfully');
    });

    it('should return not found if article does not exist', async () => {
      const response = await chai
        .request(app)
        .get('/api/v1/myArticles/jwt-key-use-case-2')
        .set('Authorization', `Bearer ${userToken}`);

      expect(response.status).to.eqls(404);
      expect(response.body.status).to.eqls('failure');
      expect(response.body.data.message).to.eqls('not found error');
    });
  });
});
