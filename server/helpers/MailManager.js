import sgMail from '@sendgrid/mail';
import env from 'dotenv';
import passwordResetEmailTemplate from './emailTemplates/resetPasswordTemplate';

env.config();

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

/**
 *
 * @description This class manages all things mailing.
 * @class MailManager
 */
class MailManager {
  /**
   * @description Utility funcion to send password reset link
   * @returns {Promise} promise object that represents mail success
   * @static
   * @param {string} email Email address if the user
   * @memberof MailManager
   */
  static sendPasswordResetLink({ user, token }) {
    const message = {
      to: `${user.email}`,
      from: 'notification@neon-ah.com',
      subject: 'Password Reset Link',
      html: passwordResetEmailTemplate(user, token)
    };

    return sgMail.send(message);
  }
}

export default MailManager;
