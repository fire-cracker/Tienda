import { sequelize } from '../../model/index';
import stripeCharge from '../helpers/stripe';

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
      user: { email }
    } = req;

    const charges = await stripeCharge(amount, currency || 'usd', stripeToken, email);

    if (charges.statusCode === 400) {
      return res.status(400).send({
        error: {
          code: charges.code,
          message: charges.message,
          field: charges.param
        }
      });
    }

    await sequelize.query(
      'CALL orders_update_order (:param1, :param2, :param3, :param4, :param5)', {
        replacements: {
          param1: orderId,
          param2: 10,
          param3: description,
          param4: charges.id,
          param5: null
        }
      }
    );

    return res.status(200).send(
      charges
    );
  } catch (error) {
    return res.status(500).send({
      message: 'An error occurred'
    });
  }
};
