import { expect } from 'chai';
import MailManager from '../../helpers/MailManager';
import sgMail from '@sendgrid/mail';
import env from 'dotenv';
import sinon from 'sinon';

env.config();
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

describe('Mail Manager Utility Class', () => {
  describe('sendPasswordResetLink', () => {
    it('It should be called when provided with the right parameters', async () => {
      const stub = sinon.stub(sgMail, 'send');
      stub.resolves();
      await MailManager.sendPasswordResetLink({ user: { email: 'hi@me.com' }, token: 'hello' });
      expect(stub.called).to.be.eql(true);
    });
  });
});
