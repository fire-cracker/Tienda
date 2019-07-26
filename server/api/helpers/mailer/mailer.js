import sgMail from '@sendgrid/mail';
import env from 'dotenv';

import verifyTemplate from './templates/templates';

env.config();
sgMail.setApiKey(process.env.SENDGRID_KEY);

/**
  * @export
  * @function orderConfirmationMail
  * @param {Object} username - created Customer's username
  * @param {Object} email - created Customer's email
  * @param {Object} orderDetails - an Object containing the details of the order
  * @returns {null} null
  */
export const orderConfirmationMail = (username, email, orderDetails) => {
  const msg = {
    to: email,
    from: process.env.TIENDA_EMAIL_ADDRESS,
    subject: 'Tienda Order Confirmation Mail',
    html: verifyTemplate(username, orderDetails),
  };
  return sgMail.send(msg);
};
