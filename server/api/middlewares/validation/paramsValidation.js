import Joi from '@hapi/joi';

import { validationHandler } from './validationHandler';

const objectId = Joi.number().required();

export const paramsValidator = (req, res, next) => {
  const [paramsKey] = Object.keys(req.params);
  return validationHandler(req.params, { [paramsKey]: objectId }, res, next);
};
