import { validationHandler } from './validationHandler';
import {
  chargeOrderSchema,
} from './schemas/chargeOrderSchema';


/**
* @export
* @function chargeOrderValidator
* @param {Object} req - request received
* @param {Object} res - response object
* @param {Object} next - next object
* @returns {Object} next object
*/
export const chargeOrderValidator = (req, res, next) => {
  return validationHandler(req.body, chargeOrderSchema, res, next);
};
