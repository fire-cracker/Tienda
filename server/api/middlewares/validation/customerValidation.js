import { validationHandler } from './validationHandler';
import { registerCustomerSchema } from './schemas/customerSchema';


/**
* @export
* @function registerCustomerValidator
* @param {Object} req - request received
* @param {Object} res - response object
* @param {Object} next - next object
* @returns {Object} next object
*/
export const registerCustomerValidator = (req, res, next) => {
  return validationHandler(req.body, registerCustomerSchema, res, next);
};
