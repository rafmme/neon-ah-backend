import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import sinon from 'sinon';
import app from '../../..';
import db from '../../models';
import { userToken, userToken2 } from '../mockData/tokens';

const { Tag } = db;

chai.use(chaiHttp);
chai.should();

describe('API endpoint /tags/', () => {
  describe('POST /api/v1/tags/:tagName/follow', () => {
    it('should not allow unauthenticated user follow tags', async () => {
      const response = await chai
        .request(app)
        .post('/api/v1/tags/technology/follow')
        .send();

      expect(response.status).to.eqls(401);
      expect(response.body.status).to.eqls('failure');
      expect(response.body.data.message).to.eqls('You are not logged in.');
    });

    it('should successfully make the user follow the tag', async () => {
      const response = await chai
        .request(app)
        .post('/api/v1/tags/technology/follow')
        .set({ authorization: `Bearer ${userToken}` })
        .send();

      expect(response.status).to.eqls(201);
      expect(response.body.status).to.eqls('success');
      expect(response.body.data.message).to.eqls(
        'You are now following the technology tag'
      );
    });

    it('should give conflict error if user tries to follow the same tag twice', async () => {
      const response = await chai
        .request(app)
        .post('/api/v1/tags/technology/follow')
        .set({ authorization: `Bearer ${userToken}` })
        .send();

      expect(response.status).to.eqls(409);
      expect(response.body.status).to.eqls('failure');
      expect(response.body.data.message).to.eqls(
        'You are already following the technology tag'
      );
    });

    it('should give not found error if tag to follow does not exist', async () => {
      const response = await chai
        .request(app)
        .post('/api/v1/tags/mkjkjnjlop/follow')
        .set({ authorization: `Bearer ${userToken}` })
        .send();

      expect(response.status).to.eqls(404);
      expect(response.body.status).to.eqls('failure');
      expect(response.body.data.message).to.eqls(
        'mkjkjnjlop tag does not exist'
      );
    });
  });

  describe('Get Following Tags Articles Model', () => {
    it('It should show correct message when user is not following any tags', async () => {
      const response = await chai
        .request(app)
        .get('/api/v1/tags/feeds')
        .set('Authorization', `Bearer ${userToken2}`);

      expect(response.status).to.eqls(404);
      expect(response.body.status).to.eqls('failure');
      expect(response.body.data.message).to.eqls(
        'You are not following any tags'
      );
      expect(response.body.data.statusCode).to.eqls(404);
    });

    it('It should show correct response when user is following tags', async () => {
      const response = await chai
        .request(app)
        .get('/api/v1/tags/feeds')
        .set('Authorization', `Bearer ${userToken}`);

      expect(response.status).to.eqls(200);
      expect(response.body.status).to.eqls('success');
      expect(response.body.data.message).to.eqls(
        'Articles under tags returned sucessfully'
      );
      expect(response.body.data.statusCode).to.eqls(200);
      expect(response.body.data.payload).to.be.an('array');
    });

    it('Should get handle unexpected errors that occur when get article from tags user follows', async () => {
      const stub = sinon
        .stub(Tag, 'findAll')
        .callsFake(() => Promise.reject(new Error('Internal Server Error')));
      const response = await chai
        .request(app)
        .get('/api/v1/tags/feeds')
        .set('Authorization', `Bearer ${userToken}`)
        .send({});

      expect(response.status).to.eqls(500);
      expect(response.body.status).to.eqls('failure');
      expect(response.body.data.statusCode).to.eqls(500);
      stub.restore();
    });
  });

  describe('DELETE /api/v1/tags/:tagName/unfollow', () => {
    it('should not allow unauthenticated user unfollow tags', async () => {
      const response = await chai
        .request(app)
        .delete('/api/v1/tags/technology/unfollow')
        .send();

      expect(response.status).to.eqls(401);
      expect(response.body.status).to.eqls('failure');
      expect(response.body.data.message).to.eqls('You are not logged in.');
    });

    it('should successfully make the user unfollow the tag', async () => {
      const response = await chai
        .request(app)
        .delete('/api/v1/tags/technology/unfollow')
        .set({ authorization: `Bearer ${userToken}` })
        .send();

      expect(response.status).to.eqls(200);
      expect(response.body.status).to.eqls('success');
      expect(response.body.data.message).to.eqls(
        'You have now unfollowed the technology tag'
      );
    });

    it('should give conflict error if user tries to unfollow the tag they are not following', async () => {
      const response = await chai
        .request(app)
        .delete('/api/v1/tags/technology/unfollow')
        .set({ authorization: `Bearer ${userToken}` })
        .send();

      expect(response.status).to.eqls(400);
      expect(response.body.status).to.eqls('failure');
      expect(response.body.data.message).to.eqls(
        'You are not following the technology tag'
      );
    });

    it('should give not found error if tag to unfollow does not exist', async () => {
      const response = await chai
        .request(app)
        .delete('/api/v1/tags/mkjkjnjlop/unfollow')
        .set({ authorization: `Bearer ${userToken}` })
        .send();

      expect(response.status).to.eqls(404);
      expect(response.body.status).to.eqls('failure');
      expect(response.body.data.message).to.eqls(
        'mkjkjnjlop tag does not exist'
      );
    });
  });

  describe('GET /api/v1/tags/followedTags', () => {
    it('should not allow unauthenticated user get all tags they follow', async () => {
      const response = await chai
        .request(app)
        .get('/api/v1/tags/followedTags')
        .send();

      expect(response.status).to.eqls(401);
      expect(response.body.status).to.eqls('failure');
      expect(response.body.data.message).to.eqls('You are not logged in.');
    });

    it('should successfully get all tags the user follows', async () => {
      const response = await chai
        .request(app)
        .get('/api/v1/tags/followedTags')
        .set({ authorization: `Bearer ${userToken}` })
        .send();

      expect(response.status).to.eqls(200);
      expect(response.body.status).to.eqls('success');
      expect(response.body.data.message).to.eqls('Tags you are following');
    });

    it('should return empty array if user does not follow any tag', async () => {
      const response = await chai
        .request(app)
        .get('/api/v1/tags/followedTags')
        .set({ authorization: `Bearer ${userToken2}` })
        .send();

      expect(response.status).to.eqls(200);
      expect(response.body.status).to.eqls('success');
      expect(response.body.data.message).to.eqls(
        'You are currenly not following any tag'
      );
    });
  });
});
