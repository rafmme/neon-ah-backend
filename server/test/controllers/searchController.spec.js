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
    it('It should be to search for authors', async () => {
      const response = await chai
        .request(app)
        .get('/api/v1/search?author=s')
        .set('Authorization', `Bearer ${token}`)
      expect(response.status).to.eqls(200);
      expect(response.body.status).to.eqls('success');
    });
    it('It should not be able to search for authors if inputed value dont exits ', async () => {
        const response = await chai
          .request(app)
          .get('/api/v1/search?author=w')
          .set('Authorization', `Bearer ${token}`)
        expect(response.status).to.eqls(404);
        expect(response.body.status).to.eqls('failure');
        expect(response.body.data.message).to.eqls('Arthor not found');     
      });
      it('It should not be able to search for authors if inputed value is empty', async () => {
        const response = await chai
          .request(app)
          .get('/api/v1/search?author=')
          .set('Authorization', `Bearer ${token}`)
        expect(response.status).to.eqls(400);
        expect(response.body.status).to.eqls('failure');
        expect(response.body.data.message).to.eqls('No search parameters supplied');     
      })
    it('It should be able to handle unexpected errors thrown when searching', async () => {
      const stub = sinon
        .stub(User, 'findAll')
        .callsFake(() => Promise.reject(new Error('Internal Server Error')));

      const response = await chai
        .request(app)
        .get('/api/v1/search?author=s')
        .set('Authorization', `Bearer ${token}`)
        console.log(response.body)
      expect(response.body.data.statusCode).to.equal(500);
      stub.restore();
    });
  });
});