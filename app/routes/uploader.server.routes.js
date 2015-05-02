'use strict';

module.exports = function(app) {
    var uploader = require('../../app/controllers/uploader.server.controller');
    var users = require('../../app/controllers/users.server.controller');

    app.route('/upload')
        .post(users.requiresLogin, uploader.upload);
};
