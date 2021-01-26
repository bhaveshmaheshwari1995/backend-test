import * as handlers from './handlers';

const schemas = require('./schema');

let routes = [
  {
    method: 'GET',
    path: '/user/{user_id}',
    handler: handlers.getUser
  },
  {
    method: 'DELETE',
    path: '/user/{user_id}',
    handler: handlers.deleteUser
  },
  {
    method: 'PUT',
    path: '/user/{user_id}',
    handler: handlers.editUser,
    config: {
			description: "Edit user details",
			validate: {
				options: {
					stripUnknown: true
				},
				payload: schemas.Put
			}
		}
  },
];

export default routes;
