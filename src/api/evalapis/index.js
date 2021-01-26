import * as handlers from './handlers';

const schemas = require('./schema');

let routes = [
  {
    method: 'POST',
    path: '/checkUser',
    handler: handlers.validateUser,
    config: {
			description: "validateUser for the given rule",
			validate: {
				options: {
					stripUnknown: true
				},
				payload: schemas.Eval
			}
		}
  },
];

export default routes;
