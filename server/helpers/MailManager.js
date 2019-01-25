import sgMail from '@sendgrid/mail';
import env from 'dotenv';
import passwordResetEmailTemplate from './emailTemplates/resetPasswordTemplate';
import verifyEmailTemplate from './emailTemplates/verifyEmailTemplate';

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

  /**
   * @static
   * @description utility function to send verification email to user.
   * @param {string} email Email address of the user
   * @param {string} token token to send to user's email.
   * @returns {Promise} A promise object that represents mail success.
   * @memberof MailManager
   */
  static sendVerificationEmail({ createdUser, token }) {
    const message = {
      to: `${createdUser.email}`,
      from: 'notification@neon-ah.com',
      subject: "Welcome to Author's Haven! Confirm your email",
      html: verifyEmailTemplate(createdUser, token)
    };
    return sgMail.send(message);
  }
}

export default MailManager;
