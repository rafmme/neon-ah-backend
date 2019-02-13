import { expect } from 'chai';
import sgMail from '@sendgrid/mail';
import env from 'dotenv';
import sinon from 'sinon';
import MailManager from '../../helpers/MailManager';

env.config();
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

describe('Mail Manager Utility Class', () => {
  describe('sendPasswordResetLink', () => {
    const sampleMailConfig = {};
    it('It should be called when provided with the right parameters', async () => {
      process.env.NODE_ENV = 'dev';
      const stub = sinon.stub(sgMail, 'send');
      stub.resolves();
      await MailManager.sendMailNotification(sampleMailConfig);
      expect(stub.called).to.be.eql(true);
      process.env.NODE_ENV = 'test';
    });
  });
});
