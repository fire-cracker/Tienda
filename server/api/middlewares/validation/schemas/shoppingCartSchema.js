import Joi from '@hapi/joi';

const cartId = Joi.number().required();
const productId = Joi.number().required();
const attributes = Joi.string().alphanum().trim().required()
  .max(1000);

export const addToShoppingCartSchema = {
  cart_id: cartId,
  product_id: productId,
  attributes
};
