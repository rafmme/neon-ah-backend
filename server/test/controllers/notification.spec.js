import chai, { expect } from 'chai';
import sinon from 'sinon';
import chaiHttp from 'chai-http';
import app from '../../..';
import { userToken, userToken2 } from '../mockData/tokens';
import mockArticles from '../mockData/dummyArticleData';
import MailManager from '../../helpers/MailManager';
import eventHandler from '../../helpers/eventsHandler';

chai.use(chaiHttp);

describe('Notifications', () => {
  it("Author's followers should be able to receive Notification", async () => {
    mockArticles[5].content = 'kajagksgkagsdkfaskjagsfkasgfkgaksfgaksfg';
    mockArticles[5].isPublished = true;
    await chai
      .request(app)
      .post('/api/v1/users/jesseinit/follow')
      .set('Authorization', `Bearer ${userToken2}`);
    const response = await chai
      .request(app)
      .post('/api/v1/articles')
      .set({ authorization: `Bearer ${userToken}` })
      .send(mockArticles[5]);

    expect(response.body.status).to.equal('success');
    expect(response.body.data.statusCode).to.equal(201);
    expect(response.body.data.message).to.equal('New article has been successfully created');
  });
});
