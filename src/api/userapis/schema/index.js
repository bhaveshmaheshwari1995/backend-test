const Joi = require('joi');

module.exports = {
	Put: Joi.object({
		has_depositted: Joi.boolean(),
		wallet_balance: Joi.number().min(0),
		number_of_deposits: Joi.number().min(0)
	}).min(1)
};