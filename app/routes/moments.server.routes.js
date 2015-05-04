'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users.server.controller');
	var moments = require('../../app/controllers/moments.server.controller');

	// Moments Routes
	app.route('/moments')
		.get(users.requiresLogin, moments.list)
		.post(users.requiresLogin, moments.create);

	app.route('/moments/:momentId')
		.get(users.requiresLogin, moments.read)
		.put(users.requiresLogin, moments.hasAuthorization, moments.update)
		.delete(users.requiresLogin, moments.hasAuthorization, moments.delete);

	// Finish by binding the Moment middleware
	app.param('momentId', moments.momentByID);
};
