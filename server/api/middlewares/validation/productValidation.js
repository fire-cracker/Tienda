import { validationHandler } from './validationHandler';
import { getAllProductsSchema, searchProductsSchema } from './schemas/productSchema';


/**
* @export
* @function getAllProductValidator
* @param {Object} req - request received
* @param {Object} res - response object
* @param {Object} next - next object
* @returns {Object} next object
*/
export const getProductsValidator = (req, res, next) => {
  return validationHandler(req.query, getAllProductsSchema, res, next);
};

/**
* @export
* @function searchProductsValidator
* @param {Object} req - request received
* @param {Object} res - response object
* @param {Object} next - next object
* @returns {Object} next object
*/
export const searchProductsValidator = (req, res, next) => {
  return validationHandler(req.query, searchProductsSchema, res, next);
};
