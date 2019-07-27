import {
  addproductToShoppingCart, getShoppingCartProducts
} from '../services/shoppingCartService';

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

    await addproductToShoppingCart(cartId, productId, attributes);

    const products = await getShoppingCartProducts(cartId);

    return res.status(200).send(
      products
    );
  } catch (error) {
    return res.status(502).send({
      message: 'An error occurred'
    });
  }
};
