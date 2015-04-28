'use strict';

module.exports = {
	app: {
		title: 'PhotoStore',
		description: 'A private photo store with NodeJS',
		keywords: 'photo, upload, node.js, angularjs, express, mongodb'
	},
	port: process.env.PORT || 3000,
	templateEngine: 'swig',
	sessionSecret: 'MEAN',
	sessionCollection: 'sessions',
	assets: {
		lib: {
			css: [
				'public/lib/bootstrap/dist/css/bootstrap.css',
				'public/lib/bootstrap/dist/css/bootstrap-theme.css'
			],
			js: [
				'public/lib/jquery/dist/jquery.min.js',
				'public/lib/angular/angular.js',
				'public/lib/angular-resource/angular-resource.js',
				'public/lib/angular-cookies/angular-cookies.js',
				'public/lib/angular-animate/angular-animate.js',
				'public/lib/angular-touch/angular-touch.js',
				'public/lib/angular-sanitize/angular-sanitize.js',
				'public/lib/angular-ui-router/release/angular-ui-router.js',
				'public/lib/angular-ui-utils/ui-utils.js',
				'public/lib/angular-bootstrap/ui-bootstrap-tpls.js',
				'public/lib/uploader/jquery.ui.widget.js',
				'public/lib/uploader/load-image.all.min.js',
				'public/lib/uploader/canvas-to-blob.min.js',
				'public/lib/bootstrap/dist/bootstrap.min.js',
				'public/lib/uploader/blueimp-gallery.js',
				'public/lib/uploader/jquery.blueimp-gallery.min.js',
				'public/lib/uploader/jquery.iframe-transport.js',
				'public/lib/uploader/jquery.fileupload.js',
				'public/lib/uploader/jquery.fileupload-process.js',
				'public/lib/uploader/jquery.fileupload-image.js',
				'public/lib/uploader/jquery.fileupload-audio.js',
				'public/lib/uploader/jquery.fileupload-video.js',
				'public/lib/uploader/jquery.fileupload-validate.js',
				'public/lib/uploader/jquery.fileupload-angular.js'
			]
		},
		css: [
			'public/modules/**/css/*.css'
		],
		js: [
			'public/config.js',
			'public/application.js',
			'public/modules/*/*.js',
			'public/modules/*/*[!tests]*/*.js'
		],
		tests: [
			'public/lib/angular-mocks/angular-mocks.js',
			'public/modules/*/tests/*.js'
		]
	}
};