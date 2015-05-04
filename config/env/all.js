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
				'public/lib/angular-bootstrap-lightbox/dist/angular-bootstrap-lightbox.css',
				'public/modules/core/css/bootstrap.min.css'
			],
			js: [
                'public/lib/jquery/dist/jquery.min.js',
                'public/lib/jquery-bridget/jquery.bridget.js',
                'public/lib/get-style-property/get-style-property.js',
                'public/lib/get-size/get-size.js',
                'public/lib/eventEmitter/EventEmitter.min.js',
                'public/lib/eventie/eventie.js',
                'public/lib/doc-ready/doc-ready.js',
                'public/lib/matches-selector/matches-selector.js',
                'public/lib/outlayer/item.js',
                'public/lib/outlayer/outlayer.js',
                'public/lib/masonry/dist/masonry.pkgd.min.js',
                'public/lib/imagesloaded/imagesloaded.pkgd.min.js',
				'public/lib/angular/angular.js',
				'public/lib/angular-resource/angular-resource.js',
				'public/lib/angular-cookies/angular-cookies.js',
				'public/lib/angular-animate/angular-animate.js',
				'public/lib/angular-touch/angular-touch.js',
				'public/lib/angular-sanitize/angular-sanitize.js',
				'public/lib/angular-ui-router/release/angular-ui-router.js',
				'public/lib/angular-ui-utils/ui-utils.js',
				'public/lib/angular-bootstrap/ui-bootstrap-tpls.js',
                'public/lib/angular-masonry/angular-masonry.js',
				'public/lib/angular-bootstrap-lightbox/dist/angular-bootstrap-lightbox.js'
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
