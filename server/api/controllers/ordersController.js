import {
  addOrder, cartsCount
} from '../services/orderServices';

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

    const cartCount = await cartsCount(cartId);

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

    const [order] = await addOrder(cartId, customerId, shippingId, taxId);

    return res.status(200).send(
      order
    );
  } catch (error) {
    return res.status(502).send({
      message: 'An error occurred'
    });
  }
};
