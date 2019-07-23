import Joi from '@hapi/joi';

const stripeToken = Joi.string().trim().required();
const orderId = Joi.number().required();
const description = Joi.string().alphanum().trim().required();
const amount = Joi.number().required();
const currency = Joi.string();


export const chargeOrderSchema = {
  stripe_token: stripeToken,
  order_id: orderId,
  description,
  amount,
  currency
};
