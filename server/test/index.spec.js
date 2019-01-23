import chai from 'chai';
import chaiHttp from 'chai-http';

import app from '../../index';

chai.use(chaiHttp);
const { expect } = chai;

describe('Checks page routes', () => {
  describe('checks landing url. GET /', () => {
    it('landing page', async () => {
      const response = await chai.request(app).get('/');
      expect(response.body).to.be.equal("Welcome to Authors' Haven");
    });
    it('checks return status is 200', async () => {
      const response = await chai.request(app).get('/');
      expect(response).to.have.status(200);
    });
  });
});
