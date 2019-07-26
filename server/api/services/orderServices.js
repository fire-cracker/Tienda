import { sequelize } from '../../model/index';

/**
* @export
* @function addOrder
* @param {Integer} cartId - id of cart in shopping cart
* @param {Integer} customerId - id of customer who owns cart
* @param {Integer} shippingId - order shipping Id
* @param {Integer} taxId - order tax id
* @returns {Object} object
*/
export const addOrder = async (cartId, customerId, shippingId, taxId) => {
  const order = await sequelize.query(
    'CALL shopping_cart_create_order (:param1, :param2, :param3, :param4)', {
      replacements: {
        param1: cartId,
        param2: customerId,
        param3: shippingId,
        param4: taxId
      }
    }
  );

  return order;
};

/**
* @export
* @function cartsCount
* @param {Integer} cartId - id of cart in shopping cart
* @returns {Object} object
*/
export const cartsCount = async (cartId) => {
  const [{ cart_count: cartCount }] = await sequelize.query(
    'CALL shopping_cart_count_cart (:param1)', {
      replacements: {
        param1: cartId
      }
    }
  );
  return cartCount;
};
