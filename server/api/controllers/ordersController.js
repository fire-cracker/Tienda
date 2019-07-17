import { sequelize } from '../../model/index';

/**
* @export
* @function createOrder
* @param {Object} req - request received
* @param {Object} res - response object
* @returns {Object} JSON object (JSend format)
*/
export const createOrder = async (req, res) => {
  try {
    const {
      body: {
        cart_id: cartId, shipping_id: shippingId, tax_id: taxId
      },
      user: {
        customer_id: customerId
      }
    } = req;

    const [{ cart_count: cartCount }] = await sequelize.query(
      'CALL shopping_cart_count_cart (:param1)', {
        replacements: {
          param1: cartId
        }
      }
    );

    if (!cartCount) {
      return res.status(400).send({
        error: {
          status: 400,
          code: 'CAR_02',
          message: 'Cart does not exist',
          field: 'CartId'
        }
      });
    }

    const [order] = await sequelize.query(
      'CALL shopping_cart_create_order (:param1, :param2, :param3, :param4)', {
        replacements: {
          param1: cartId,
          param2: customerId,
          param3: shippingId,
          param4: taxId
        }
      }
    );

    return res.status(200).send(
      order
    );
  } catch (error) {
    return res.status(502).send({
      message: 'An error occurred'
    });
  }
};
