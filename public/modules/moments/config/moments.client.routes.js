'use strict';

//Setting up route
angular.module('moments').config(['$stateProvider',
	function($stateProvider) {
		// Moments state routing
		$stateProvider.
		state('listMoments', {
			url: '/moments',
			templateUrl: 'modules/moments/views/list-moments.client.view.html'
		}).
		state('createMoment', {
			url: '/moments/create',
			templateUrl: 'modules/moments/views/create-moment.client.view.html'
		}).
		state('editMoment', {
			url: '/moments/:momentId/edit',
			templateUrl: 'modules/moments/views/edit-moment.client.view.html'
		});
	}
]);
