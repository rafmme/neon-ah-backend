import sinon from 'sinon';
import chai, { expect } from 'chai';
import sinonChai from 'sinon-chai';
import AuthMiddleware from '../../middlewares/AuthMiddleware';
import TokenManager from '../../helpers/TokenManager';
import db from '../../models';

chai.use(sinonChai);

describe('Middlewares function test', () => {
  describe('AuthMiddleware Test', () => {
    it('it should throw a 500 server error', async () => {
      const req = {};
      const res = {
        status() {},
        json() {}
      };
      sinon.stub(res, 'status').returnsThis();
      sinon.stub(TokenManager, 'verify').throws();
      AuthMiddleware.checkIfUserIsAuthenticated(req, res, null);
      expect(res.status).to.have.been.calledWith(500);
      sinon.restore();
    });
  });
});
