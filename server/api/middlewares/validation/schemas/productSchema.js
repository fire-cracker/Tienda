import Joi from '@hapi/joi';

const descriptionLength = Joi.number().max(1000);
const limit = Joi.number().max(100);
const page = Joi.number();
const queryString = Joi.string().alphanum().trim().required();
const allWords = Joi.string().trim().valid(['on', 'off']);


export const getAllProductsSchema = {
  description_length: descriptionLength,
  limit,
  page
};

export const searchProductsSchema = {
  query_string: queryString,
  all_words: allWords,
  description_length: descriptionLength,
  limit,
  page
};
