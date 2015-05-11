'use strict';

/**
 * Module dependencies.
 */
var _ = require('lodash'),
    formidable = require('formidable'),
    fs = require('fs'),
    path = require('path'),
    easyimg = require('easyimage');


function createThumb(src, dst) {
    easyimg.resize({
        src: src, dst: dst,
        width: 500, height: 500
    }).then(
        function (image) {
            console.log('Resized and cropped: ' + image.width + ' x ' + image.height);
        },
        function (err) {
            console.log(err);
        });
}

/**
 * Upload file
 */
exports.upload = function (req, res) {
    var form = new formidable.IncomingForm(),
        file_realname = '';

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
        file_realname = file.name;
    });

    form.on('aborted', function () {
        var data = {
            message: 'File upload was aborted'
        };
        res.jsonp(data);
    });

    form.on('error', function (err) {
        res.end(err);
    });

    form.on('end', function () {
        console.log('-> upload done');
        var file_name = path.basename(this.openedFiles[0].path);
        var file_ext = path.extname(file_realname);
        file_name = file_name + file_ext;
        var file_path = uploadDir + '/' + file_name;
        var thumb_path = file_path + '.thumb';
        fs.rename(this.openedFiles[0].path, file_path);

        easyimg.resize({
            src: file_path, dst: thumb_path,
            width: 300, height: 300
        }).then(
            function (image) {
                console.log('Resized and cropped: ' + image.width + ' x ' + image.height);
                var url_base = req.protocol + '://' + req.get('host') + '/uploads/' + user_name + '/';

                var data = {
                    url: url_base + file_name,
                    thumbUrl: url_base + file_name + '.thumb',
                    message: 'File uploaded'
                };

                res.jsonp(data);
            },
            function (err) {
                console.log(err);
            });
    });
    
    form.parse(req);
};
