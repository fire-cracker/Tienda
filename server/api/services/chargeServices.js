import { sequelize } from '../../model/index';

/**
* @export
* @function updateOrder
* @param {Integer} orderId - id of the order to be updated
* @param {String} description - description of the order
* @param {Integer} stripeChargeId - id of the stripe charge of the order
* @returns {Object} object
*/
export const updateOrder = async (orderId, description, stripeChargeId) => {
  await sequelize.query(
    'CALL orders_update_order (:param1, :param2, :param3, :param4, :param5)', {
      replacements: {
        param1: orderId,
        param2: 10,
        param3: description,
        param4: stripeChargeId,
        param5: null
      }
    }
  );
};

/**
* @export
* @function getOrderDetails
* @param {Integer} orderId - id of the order
* @returns {Object} object
*/
export const getOrderDetails = async (orderId) => {
  const orderDetails = await sequelize.query(
    'CALL orders_get_order_details (:param1)', {
      replacements: {
        param1: orderId,
      }
    }
  );
  return orderDetails;
};
