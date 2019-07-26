import env from 'dotenv';

import stripeCharge from '../helpers/stripe';
import { orderConfirmationMail } from '../helpers/mailer/mailer';
import {
  updateOrder, getOrderDetails
} from '../services/chargeServices';

env.config();
const { NODE_ENV } = process.env;

/**
* @export
* @function createCharge
* @param {Object} req - request received
* @param {Object} res - response object
* @returns {Object} JSON object (JSend format)
*/
export const createCharge = async (req, res) => {
  try {
    const {
      body: {
        stripe_token: stripeToken, order_id: orderId, description, amount, currency
      },
      user: { name, email }
    } = req;

    const stripeCharges = await stripeCharge(amount, currency || 'usd', stripeToken, email);

    if (stripeCharges.statusCode === 400) {
      return res.status(400).send({
        error: {
          code: stripeCharges.code,
          message: stripeCharges.message,
          field: stripeCharges.param
        }
      });
    }
    await updateOrder(orderId, description, stripeCharges.id);

    const [orderDetails] = await getOrderDetails(orderId);

    if (NODE_ENV === 'development' || NODE_ENV === 'production') {
      await orderConfirmationMail(name, email, orderDetails);
    }

    return res.status(200).send(
      stripeCharges
    );
  } catch (error) {
    return res.status(500).send({
      message: 'An error occurred'
    });
  }
};
