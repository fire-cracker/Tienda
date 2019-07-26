import { sequelize } from '../../model/index';

/**
* @export
* @function addproductToShoppingCart
* @param {Integer} cartId - cart id of cart in shopping cart
* @param {integer} productId - product id of product to add to cart
* @param {String} attributes - customer email
* @returns {Object} object
*/
export const addproductToShoppingCart = async (cartId, productId, attributes) => {
  await sequelize.query(
    'CALL shopping_cart_add_product (:param1, :param2, :param3)', {
      replacements: { param1: cartId, param2: productId, param3: attributes }
    }
  );
};

/**
* @export
* @function getShoppingCartProducts
* @param {Integer} cartId - cart id of cart in shopping cart
* @returns {Object} object
*/
export const getShoppingCartProducts = async (cartId) => {
  const products = await sequelize.query(
    `CALL shopping_cart_get_products (${cartId})`
  );
  return products;
};
