'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    _ = require('lodash'),
    formidable = require('formidable'),
    fs = require('fs'),
    path = require('path');


/**
 * Upload file
 */
exports.upload = function(req, res) {
    var form = new formidable.IncomingForm(),
        file_path = '',
        file_size = '';

    var user_name = req.user.username;
    console.log('upload function called by ' + user_name);
    var uploadDir = 'public/uploads/' + user_name;

    try {
        fs.mkdirSync(uploadDir);
    } catch (e) {
        if (e.code !== 'EEXIST') throw e;
    }

    form.uploadDir = uploadDir;

    form.on('file', function (name, file) {
        file_path = file.path;
        file_size = file.size;
    });

    form.on('end', function () {
        console.log('-> upload done');
        var file_name = path.basename(this.openedFiles[0].path);
        var data = {
            url: req.protocol + '://' + req.get('host') + '/uploads/' + user_name + '/' + file_name,
            message: 'File uploaded'
        };

        res.jsonp(data);
    });
    form.parse(req);
};

/**
 * Show the current Uploader
 */
exports.get = function(req, res) {
    res.jsonp(req.user.username + ', you need to post here.');
};

/**
 * Update a Uploader
 */
exports.update = function(req, res) {

};

/**
 * Delete an Uploader
 */
exports.delete = function(req, res) {

};

/**
 * List of Uploaders
 */
exports.list = function(req, res) {

};
