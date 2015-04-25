'use strict';

//Setting up route
angular.module('photos').config(['$stateProvider',
	function($stateProvider) {
		// Photos state routing
		$stateProvider.
		state('listPhotos', {
			url: '/photos',
			templateUrl: 'modules/photos/views/list-photos.client.view.html'
		}).
		state('createPhoto', {
			url: '/photos/create',
			templateUrl: 'modules/photos/views/create-photo.client.view.html'
		}).
		state('viewPhoto', {
			url: '/photos/:photoId',
			templateUrl: 'modules/photos/views/view-photo.client.view.html'
		}).
		state('editPhoto', {
			url: '/photos/:photoId/edit',
			templateUrl: 'modules/photos/views/edit-photo.client.view.html'
		});
	}
]);