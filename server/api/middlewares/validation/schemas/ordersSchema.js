import Joi from '@hapi/joi';

const cartId = Joi.string().required().trim();
const shippingId = Joi.number().required();
const taxId = Joi.number().required();


export const createOrderSchema = {
  cart_id: cartId,
  shipping_id: shippingId,
  tax_id: taxId
};
