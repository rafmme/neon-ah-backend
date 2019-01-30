import chai from 'chai';
import chaiHttp from 'chai-http';

import app from '../../index';

chai.use(chaiHttp);
const { expect } = chai;

describe('API Routes', () => {
  it('Home route should return success', async () => {
    const response = await chai.request(app).get('/');
    expect(response.body).to.be.equal("Welcome to Authors' Haven");
    expect(response).to.have.status(200);
  });
  it('Undefined API routes should return a 404', async () => {
    const response = await chai.request(app).get('/api/v1/undefinedRoute');
    expect(response).to.have.status(404);
  });
});
