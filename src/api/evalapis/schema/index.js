const Joi = require('joi');

module.exports = {
	Eval: Joi.object({
		user_id: Joi.number().required(),
		expr: Joi.string().required()
	})
};