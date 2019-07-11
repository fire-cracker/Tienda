import Joi from '@hapi/joi';

export const validationHandler = async (req, schema, res, next) => {
  try {
    await Joi.validate(req, schema);
    next();
  } catch (error) {
    return res.status(422).send({
      error: error.details[0].message,
      field: error.details[0].path[0],
    });
  }
};
