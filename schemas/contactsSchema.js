const Joi = require("joi");

const addSchema = Joi.object({
  name: Joi.string().optional(),
  email: Joi.string().optional(),
  phone: Joi.number().optional(),
});

module.exports = {
  addSchema,
};
