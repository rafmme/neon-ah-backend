import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import sinon from 'sinon';
import app from '../../..';
import db from '../../models';
import { token, tokenTwo } from '../mockData/token';


const { Follow } = db;
describe('Article Feed Controller Model', () => {
  describe('Get Following Authors Articles Model', () => {
    it('Should get all articles written by author you followed', async () => {
      const response = await chai
        .request(app)
        .get('/api/v1/articles/feeds')
        .set('Authorization', `Bearer ${tokenTwo}`)
        console.log(response.body)
      expect(response.status).to.eqls(200);
      expect(response.body.status).to.eqls('success');
      expect(response.body.data.message).to.eqls('Article found.');
    });
    it('Should not get an article if no user is followed', async () => {
        const response = await chai
          .request(app)
          .get('/api/v1/articles/feeds')
          .set('Authorization', `Bearer ${token}`)
          console.log(response.body)
        expect(response.status).to.eqls(404);
        expect(response.body.status).to.eqls('failure');
        expect(response.body.data.message).to.eqls('Article not found, no author has been followed.');
      });
  });
  it('It should be able to handle unexpected errors thrown during getting an article', async () => {
    const stub = sinon
      .stub(Follow, 'findAll')
      .callsFake(() => Promise.reject(new Error('Internal Server Error')));

    const response = await chai
      .request(app)
      .get('/api/v1/articles/feeds')
      .set('Authorization', `Bearer ${token}`)
      .send({
        content: 'Nice write up'
      });
    expect(response.body.data.statusCode).to.equal(500);
    stub.restore();
  });
});
