import Joi from '@hapi/joi';

import { getAllProductsSchema } from './schemas/productSchema';

/**
* @export
* @function getAllProductValidator
* @param {Object} req - request received
* @param {Object} res - response object
* @param {Object} next - next object
* @returns {Object} next object
*/
export const getProductsValidator = (req, res, next) => {
  Joi.validate(req.query, getAllProductsSchema)
    .then(() => {
      next();
    })
    .catch((error) => {
      res.status(422).send({
        error: error.details[0].message,
        field: error.details[0].path[0],
      });
    });
};
