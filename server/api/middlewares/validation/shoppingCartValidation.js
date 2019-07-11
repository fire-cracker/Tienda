import { validationHandler } from './validationHandler';
import { addToShoppingCartSchema } from './schemas/shoppingCartSchema';


/**
* @export
* @function addToShoppingCartValidator
* @param {Object} req - request received
* @param {Object} res - response object
* @param {Object} next - next object
* @returns {Object} next object
*/
export const addToShoppingCartValidator = (req, res, next) => {
  return validationHandler(req.body, addToShoppingCartSchema, res, next);
};
