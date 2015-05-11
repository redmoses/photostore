'use strict';

//Setting up route
angular.module('moments').config(['$stateProvider',
	function($stateProvider) {
		// Moments state routing
		$stateProvider.
		state('mymoments', {
			url: '/mymoments',
			templateUrl: 'modules/moments/views/mymoments.client.view.html'
		}).
		state('listMoments', {
			url: '/moments',
			templateUrl: 'modules/moments/views/list-moments.client.view.html'
		}).
		state('editMoment', {
			url: '/moments/:momentId/edit',
			templateUrl: 'modules/moments/views/edit-moment.client.view.html'
		});
	}
]);
