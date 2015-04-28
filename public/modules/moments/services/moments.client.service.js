'use strict';

//Moments service used to communicate Moments REST endpoints
angular.module('moments').factory('Moments', ['$resource',
	function($resource) {
		return $resource('moments/:momentId', { momentId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);