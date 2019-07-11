import { sequelize } from '../../model/index';

/**
* @export
* @function addToShoppingCart
* @param {Object} req - request received
* @param {Object} res - response object
* @returns {Object} JSON object (JSend format)
*/
export const addToShoppingCart = async (req, res) => {
  try {
    const {
      body: {
        cart_id: cartId, product_id: productId, attributes
      }
    } = req;

    await sequelize.query(
      'CALL shopping_cart_add_product (:param1, :param2, :param3)', {
        replacements: { param1: cartId, param2: productId, param3: attributes }
      }
    );

    const products = await sequelize.query(
      `CALL shopping_cart_get_products (${cartId})`
    );

    return res.status(200).send(
      products
    );
  } catch (error) {
    return res.status(502).send({
      message: 'An error occurred'
    });
  }
};
