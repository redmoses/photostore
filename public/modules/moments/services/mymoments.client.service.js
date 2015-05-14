'use strict';

angular.module('moments').factory('Mymoments', [ '$resource',
	function($resource) {
		return $resource('moments/mine');
	}
]);
