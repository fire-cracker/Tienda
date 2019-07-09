import Joi from '@hapi/joi';

const descriptionLength = Joi.number().max(1000);
const limit = Joi.number().max(100);
const page = Joi.number();


export const getAllProductsSchema = {
  description_length: descriptionLength,
  limit,
  page
};
