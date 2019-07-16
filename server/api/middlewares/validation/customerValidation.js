import { validationHandler } from './validationHandler';
import {
  registerCustomerSchema, loginCustomerSchema,
  updateCustomerAccountSchema
} from './schemas/customerSchema';


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

/**
* @export
* @function loginCustomerValidator
* @param {Object} req - request received
* @param {Object} res - response object
* @param {Object} next - next object
* @returns {Object} next object
*/
export const loginCustomerValidator = (req, res, next) => {
  return validationHandler(req.body, loginCustomerSchema, res, next);
};

/**
* @export
* @function updateCustomerAccountValidator
* @param {Object} req - request received
* @param {Object} res - response object
* @param {Object} next - next object
* @returns {Object} next object
*/
export const updateCustomerAccountValidator = (req, res, next) => {
  return validationHandler(req.body, updateCustomerAccountSchema, res, next);
};
