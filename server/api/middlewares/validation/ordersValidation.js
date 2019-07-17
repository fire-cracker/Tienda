import { validationHandler } from './validationHandler';
import { createOrderSchema } from './schemas/ordersSchema';


/**
* @export
* @function createOrdersValidator
* @param {Object} req - request received
* @param {Object} res - response object
* @param {Object} next - next object
* @returns {Object} next object
*/
export const createOrdersValidator = (req, res, next) => {
  return validationHandler(req.body, createOrderSchema, res, next);
};
