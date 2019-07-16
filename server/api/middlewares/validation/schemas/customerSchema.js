import Joi from '@hapi/joi';

const name = Joi.string().trim().min(8).max(150)
  .required();
const email = Joi.string().trim().min(8).max(100)
  .email({ minDomainSegments: 2 })
  .required();
const password = Joi.string().min(8).max(150).trim()
  .regex(/^[a-zA-Z0-9]{3,30}$/)
  .required();
const updateCustomerPassword = Joi.string().min(8).max(150).trim()
  .regex(/^[a-zA-Z0-9]{3,30}$/);
const dayPhone = Joi.number().integer().allow('');
const evePhone = Joi.number().integer().allow('');
const mobPhone = Joi.number().integer().allow('');
const address1 = Joi.string().trim().min(8).max(100)
  .required();
const address2 = Joi.string().trim().min(8).max(100)
  .allow('');
const city = Joi.string().trim().max(100)
  .required();
const region = Joi.string().trim().min(8).max(100)
  .required();
const postalCode = Joi.number().integer().max(10000)
  .required();
const country = Joi.string().trim().max(50)
  .required();
const shippingRegionId = Joi.number().integer().min(8)
  .max(100)
  .required();


export const registerCustomerSchema = {
  name,
  email,
  password
};

export const loginCustomerSchema = {
  email,
  password
};

export const updateCustomerAccountSchema = {
  name,
  email,
  password: updateCustomerPassword,
  day_phone: dayPhone,
  eve_phone: evePhone,
  mob_phone: mobPhone
};

export const updateCustomerAddressSchema = {
  address_1: address1,
  address_2: address2,
  city,
  region,
  postal_code: postalCode,
  country,
  shipping_region_id: shippingRegionId
};
