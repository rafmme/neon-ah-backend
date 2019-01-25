import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../../..';
import db from '../../models';
import TokenManager from '../../helpers/TokenManager';
import { userToken, userToken2, invalidToken } from '../mockData/tokens'

const { Report } = db;

chai.use(chaiHttp);

describe('Report Article Features', () => {
  describe('It should report articles', () => {
    it('Should return error for unauthorised user', async () => {
      const response = await chai
        .request(app)
        .post('/api/v1/articles/What-a-mighy-God/report')
        .set('Authorization', `Bearer ${invalidToken}`)
        .send({
          complaint: 'too long'
        });
      expect(response.status).to.equal(401);
      expect(response.body.data).to.have.property('message');
      expect(response.body.data.message).to.be.a('string');
      expect(response.body.data.message).to.be.eql('You need to log in again');
      expect(response.body.data).to.have.property('statusCode');
      expect(response.body.data.statusCode).to.be.a('Number');
      expect(response.body.status).to.equal('failure');
    });
    it('Should return error for non existing articles', async () => {
      const response = await chai
        .request(app)
        .post('/api/v1/articles/What-a-mighy-God/report')
        .set('Authorization', `Bearer ${userToken2}`)
        .send({
          complaint: 'too long'
        });
      expect(response.status).to.equal(404);
      expect(response.body.data).to.have.property('message');
      expect(response.body.data.message).to.be.a('string');
      expect(response.body.data.message).to.be.eql('Article not found');
      expect(response.body.data).to.have.property('statusCode');
      expect(response.body.data.statusCode).to.be.a('Number');
      expect(response.body.status).to.equal('failure');
    });
    it('should return error if author attempts to report own article', async () => {
      const response = await chai
        .request(app)
        .post('/api/v1/articles/how-to-be-a-10x-dev-sGNYfURm/report')
        .set('Authorization', `Bearer ${userToken}`)
        .send({
          complaint: 'too long'
        });
      expect(response.status).to.equal(403);
      expect(response.body.data).to.have.property('message');
      expect(response.body.data.message).to.be.a('string');
      expect(response.body.data.message).to.be.eql('You cannot report your own article. Do you want to Delete the article?');
      expect(response.body.data).to.have.property('statusCode');
      expect(response.body.data.statusCode).to.be.a('Number');
      expect(response.body.status).to.equal('failure');
    });
    it('should successfully report article', async () => {
      const response = await chai
        .request(app)
        .post('/api/v1/articles/how-to-be-a-10x-dev-sGNYfURm/report')
        .set('Authorization', `Bearer ${userToken2}`)
        .send({
          complaint: 'too long'
        });
      expect(response.status).to.equal(201);
      expect(response.body.data).to.have.property('message');
      expect(response.body.data.message).to.be.a('string');
      expect(response.body.data.message).to.be.eql('Your complaint has been lodged successfully');
      expect(response.body.data).to.have.property('statusCode');
      expect(response.body.data.statusCode).to.be.a('Number');
      expect(response.body.status).to.equal('success');
    });
    it('should not allow a user report an article twice', async () => {
      const response = await chai
        .request(app)
        .post('/api/v1/articles/how-to-be-a-10x-dev-sGNYfURm/report')
        .set('Authorization', `Bearer ${userToken2}`)
        .send({
          complaint: 'too long'
        });
      expect(response.status).to.equal(403);
      expect(response.body.data).to.have.property('message');
      expect(response.body.data.message).to.be.a('string');
      expect(response.body.data.message).to.be.eql('You just reported this article! Do you wish to cancel the report or modify your complaint?');
      expect(response.body.data).to.have.property('statusCode');
      expect(response.body.data.statusCode).to.be.a('Number');
      expect(response.body.status).to.equal('failure');
    });
  });
  describe('It should update reports', () => {
    it('Should return error for unauthorised user', async () => {
      const response = await chai
        .request(app)
        .post('/api/v1/articles/What-a-mighy-God/report')
        .set('Authorization', `Bearer ${invalidToken}`)
        .send({
          complaint: 'too long'
        });
      expect(response.status).to.equal(401);
      expect(response.body.data).to.have.property('message');
      expect(response.body.data.message).to.be.a('string');
      expect(response.body.data.message).to.be.eql('You need to log in again');
      expect(response.body.data).to.have.property('statusCode');
      expect(response.body.data.statusCode).to.be.a('Number');
      expect(response.body.status).to.equal('failure');
    });
    it('Should return error for non existing articles', async () => {
      const response = await chai
        .request(app)
        .put('/api/v1/articles/What-a-mighy-God/report')
        .set('Authorization', `Bearer ${userToken2}`)
        .send({
          complaint: 'too long'
        });
      expect(response.status).to.equal(404);
      expect(response.body.data).to.have.property('message');
      expect(response.body.data.message).to.be.a('string');
      expect(response.body.data.message).to.be.eql('Article not found');
      expect(response.body.data).to.have.property('statusCode');
      expect(response.body.data.statusCode).to.be.a('Number');
      expect(response.body.status).to.equal('failure');
    });
    it('should return error if author attempts to report own article', async () => {
      const response = await chai
        .request(app)
        .put('/api/v1/articles/how-to-be-a-10x-dev-sGNYfURm/report')
        .set('Authorization', `Bearer ${userToken}`)
        .send({
          complaint: 'too long'
        });
      expect(response.status).to.equal(403);
      expect(response.body.data).to.have.property('message');
      expect(response.body.data.message).to.be.a('string');
      expect(response.body.data.message).to.be.eql('You cannot report your own article. Do you want to Delete the article?');
      expect(response.body.data).to.have.property('statusCode');
      expect(response.body.data.statusCode).to.be.a('Number');
      expect(response.body.status).to.equal('failure');
    });
    it('should successfully report article', async () => {
      const response = await chai
        .request(app)
        .put('/api/v1/articles/how-to-be-a-10x-dev-sGNYfURm/report')
        .set('Authorization', `Bearer ${userToken2}`)
        .send({
          complaint: 'too long'
        });
      expect(response.status).to.equal(201);
      expect(response.body.data).to.have.property('message');
      expect(response.body.data.message).to.be.a('string');
      expect(response.body.data.message).to.be.eql('Your complaint has been modified and will be acted on');
      expect(response.body.data).to.have.property('statusCode');
      expect(response.body.data.statusCode).to.be.a('Number');
      expect(response.body.status).to.equal('success');
    });
    it('should return error if article and user do not match', async () => {
      const response = await chai
        .request(app)
        .put('/api/v1/articles/how-to-say-hello-in-2019/report')
        .set('Authorization', `Bearer ${userToken2}`)
        .send({
          complaint: 'too long'
        });
      expect(response.status).to.equal(403);
      expect(response.body.data).to.have.property('message');
      expect(response.body.data.message).to.be.a('string');
      expect(response.body.data.message).to.be.eql('You cannot modify this report');
      expect(response.body.data).to.have.property('statusCode');
      expect(response.body.data.statusCode).to.be.a('Number');
      expect(response.body.status).to.equal('failure');
    });
  });
  describe('It should show all reported articles', () => {
    it('Should return error for unauthorised user', async () => {
      const response = await chai
        .request(app)
        .get('/api/v1/reports')
        .set('Authorization', `Bearer ${invalidToken}`);
      expect(response.status).to.equal(401);
      expect(response.body.data).to.have.property('message');
      expect(response.body.data.message).to.be.a('string');
      expect(response.body.data.message).to.be.eql('You need to log in again');
      expect(response.body.data).to.have.property('statusCode');
      expect(response.body.data.statusCode).to.be.a('Number');
      expect(response.body.status).to.equal('failure');
    });
    it('Should list reported articles', async () => {
      const response = await chai
        .request(app)
        .get('/api/v1/reports')
        .set('Authorization', `Bearer ${userToken}`);
      expect(response.status).to.equal(200);
      expect(response.body.data).to.have.property('message');
      expect(response.body.data.message).to.be.a('string');
      expect(response.body.data).to.have.property('statusCode');
      expect(response.body.data.statusCode).to.be.a('Number');
      expect(response.body.status).to.equal('success');
    });
  });
  describe('It should get all Reports against an article', () => {
    it('Should return error for unauthorised user', async () => {
      const response = await chai
        .request(app)
        .get('/api/v1/reports')
        .set('Authorization', `Bearer ${invalidToken}`);
      expect(response.status).to.equal(401);
      expect(response.body.data).to.have.property('message');
      expect(response.body.data.message).to.be.a('string');
      expect(response.body.data.message).to.be.eql('You need to log in again');
      expect(response.body.data).to.have.property('statusCode');
      expect(response.body.data.statusCode).to.be.a('Number');
      expect(response.body.status).to.equal('failure');
    });
    it('Should return error for non existing articles', async () => {
      const response = await chai
        .request(app)
        .post('/api/v1/articles/What-a-mighy-God/report')
        .set('Authorization', `Bearer ${userToken2}`)
        .send({
          complaint: 'too long'
        });
      expect(response.status).to.equal(404);
      expect(response.body.data).to.have.property('message');
      expect(response.body.data.message).to.be.a('string');
      expect(response.body.data.message).to.be.eql('Article not found');
      expect(response.body.data).to.have.property('statusCode');
      expect(response.body.data.statusCode).to.be.a('Number');
      expect(response.body.status).to.equal('failure');
    });
    it('Should list reports against an article', async () => {
      const response = await chai
        .request(app)
        .get('/api/v1/articles/how-to-be-a-10x-dev-sGNYfURm/report')
        .set('Authorization', `Bearer ${userToken}`);
      expect(response.status).to.equal(200);
      expect(response.body.data).to.have.property('message');
      expect(response.body.data.message).to.be.a('string');
      expect(response.body.data).to.have.property('statusCode');
      expect(response.body.data.statusCode).to.be.a('Number');
      expect(response.body.status).to.equal('success');
    });
  });
  describe('It should get all reports logged by a user', () => {
    it('Should return error for unauthorised user', async () => {
      const response = await chai
        .request(app)
        .get('/api/v1/users/jesseinit/report')
        .set('Authorization', `Bearer ${invalidToken}`);
      expect(response.status).to.equal(401);
      expect(response.body.data).to.have.property('message');
      expect(response.body.data.message).to.be.a('string');
      expect(response.body.data.message).to.be.eql('You need to log in again');
      expect(response.body.data).to.have.property('statusCode');
      expect(response.body.data.statusCode).to.be.a('Number');
      expect(response.body.status).to.equal('failure');
    });
    it('Should return all reports by user', async () => {
      const response = await chai
        .request(app)
        .get('/api/v1/users/jesseinit/report')
        .set('Authorization', `Bearer ${userToken}`);
      expect(response.status).to.equal(200);
      expect(response.body.data).to.have.property('message');
      expect(response.body.data.message).to.be.a('string');
      expect(response.body.data).to.have.property('statusCode');
      expect(response.body.data.statusCode).to.be.a('Number');
      expect(response.body.status).to.equal('success');
    });
  });
  describe('It should delete a report against a single article', () => {
    it('Should return error for unauthorised user', async () => {
      const response = await chai
        .request(app)
        .delete('/api/v1/articles/What-a-mighy-God/report')
        .set('Authorization', `Bearer ${invalidToken}`)
        .send({
          complaint: 'too long'
        });
      expect(response.status).to.equal(401);
      expect(response.body.data).to.have.property('message');
      expect(response.body.data.message).to.be.a('string');
      expect(response.body.data.message).to.be.eql('You need to log in again');
      expect(response.body.data).to.have.property('statusCode');
      expect(response.body.data.statusCode).to.be.a('Number');
      expect(response.body.status).to.equal('failure');
    });
    it('Should return error for non existing articles', async () => {
      const response = await chai
        .request(app)
        .delete('/api/v1/articles/What-a-mighy-God/report')
        .set('Authorization', `Bearer ${userToken2}`)
        .send({
          complaint: 'too long'
        });
      expect(response.status).to.equal(404);
      expect(response.body.data).to.have.property('message');
      expect(response.body.data.message).to.be.a('string');
      expect(response.body.data.message).to.be.eql('Article not found');
      expect(response.body.data).to.have.property('statusCode');
      expect(response.body.data.statusCode).to.be.a('Number');
      expect(response.body.status).to.equal('failure');
    });
    it('Should return error for non existing report', async () => {
      const response = await chai
        .request(app)
        .delete('/api/v1/articles/how-to-say-hello-in-2019/report')
        .set('Authorization', `Bearer ${userToken2}`)
        .send({
          complaint: 'too long'
        });
      expect(response.status).to.equal(404);
      expect(response.body.data).to.have.property('message');
      expect(response.body.data.message).to.be.a('string');
      expect(response.body.data.message).to.be.eql('Report not found');
      expect(response.body.data).to.have.property('statusCode');
      expect(response.body.data.statusCode).to.be.a('Number');
      expect(response.body.status).to.equal('failure');
    });
    it('Should not delete other users\' report', async () => {
      const response = await chai
        .request(app)
        .delete('/api/v1/articles/how-to-be-a-10x-dev-sGNYfURm/report')
        .set('Authorization', `Bearer ${userToken}`)
        .send({
          complaint: 'too long'
        });
      expect(response.status).to.equal(403);
      expect(response.body.data).to.have.property('message');
      expect(response.body.data.message).to.be.a('string');
      expect(response.body.data.message).to.be.eql('You cannot delete someone else\'s report?');
      expect(response.body.data).to.have.property('statusCode');
      expect(response.body.data.statusCode).to.be.a('Number');
      expect(response.body.status).to.equal('failure');
    });
    it('Should delete a single report', async () => {
      const response = await chai
        .request(app)
        .delete('/api/v1/articles/how-to-be-a-10x-dev-sGNYfURm/report')
        .set('Authorization', `Bearer ${userToken2}`)
        .send({
          complaint: 'too long'
        });
      expect(response.status).to.equal(201);
      expect(response.body.data).to.have.property('message');
      expect(response.body.data.message).to.be.a('string');
      expect(response.body.data.message).to.be.eql('Your report has been cancelled');
      expect(response.body.data).to.have.property('statusCode');
      expect(response.body.data.statusCode).to.be.a('Number');
      expect(response.body.status).to.equal('success');
    });
  })
})
