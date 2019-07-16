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
