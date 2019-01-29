import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import sinon from 'sinon';
import app from '../../..';
import db from '../../models';
import TokenManager from '../../helpers/TokenManager';
import { userToken, userToken2, invalidToken } from '../mockData/tokens';

const { User, Article, ReadStats } = db;

describe('ReadStats Model', () => {
  describe('Get User Reading Stats', () => {
    it('Should get show proper message when user dosent have any reading stats', async () => {
      const response = await chai
        .request(app)
        .get('/api/v1/stats')
        .set('Authorization', `Bearer ${userToken2}`);

      expect(response.status).to.eqls(404);
      expect(response.body.status).to.eqls('failure');
      expect(response.body.data.message).to.eqls(
        "You currently don't have any reading stats"
      );
      expect(response.body.data.statusCode).to.eqls(404);
    });
  });
  describe('Get User Reading Stats', () => {
    it('Should get show proper message when user has reading stats', async () => {
      const response = await chai
        .request(app)
        .get('/api/v1/stats')
        .set('Authorization', `Bearer ${userToken}`);

      expect(response.status).to.eqls(200);
      expect(response.body.status).to.eqls('success');
      expect(response.body.data.message).to.eqls('ReadingStats');
      expect(response.body.data.statusCode).to.eqls(200);
    });
  });
});
