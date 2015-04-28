'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    _ = require('lodash'),
    formidable = require('formidable'),
    fs = require('fs');

/**
 * Create a Uploader
 */
exports.upload = function(req, res) {
    var form = new formidable.IncomingForm(),
        file_path = '',
        file_size = '',
        files =[];

    var user_name = req.user.username;
    console.log('upload function called by ' + user_name);
    var path = 'uploads/' + user_name;

    try {
        fs.mkdirSync(path);
    } catch (e) {
        if (e.code !== 'EEXIST') throw e;
    }

    form.uploadDir = path;

    form.on('file', function (name, file) {
        file_path = file.path;
        file_size = file.size;
        files.push(file);
    });

    form.on('end', function () {
        console.log('-> upload done');
        //fs.rename(this.openedFiles[0].path,image_path);

        var data = {
            files: [
                {
                    name: 'test.jpg',
                    size: file_size,
                    url: 'http://localhost/' + file_path,
                    thumbnailUrl: 'http://localhost/' + file_path,
                    deleteUrl: 'http://localhost/upload/test.jpg/delete',
                    deleteType: 'DELETE'
                }
            ]};

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
