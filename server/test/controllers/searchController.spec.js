import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import sinon from 'sinon';
import app from '../../..';
import db from '../../models';
import { token, tokenTwo } from '../mockData/token';

const { User } = db;

chai.use(chaiHttp);

describe('Search Model', () => {
  describe('Search by authors', () => {
    it('It should be to search for authors, tag and articles', async () => {
      const response = await chai
        .request(app)
        .get('/api/v1/search?keyword=s')
        .set('Authorization', `Bearer ${token}`);
      expect(response.status).to.eqls(200);
      expect(response.body.status).to.eqls('success');
    });
    it('It should be able to handle unexpected errors thrown when searching', async () => {
      const stub = sinon
        .stub(User, 'findAll')
        .callsFake(() => Promise.reject(new Error('Internal Server Error')));
      const response = await chai
        .request(app)
        .get('/api/v1/search?keyword=s')
        .set('Authorization', `Bearer ${token}`);
      expect(response.body.data.statusCode).to.equal(500);
      stub.restore();
    });
  });
});
