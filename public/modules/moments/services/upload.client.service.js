'use strict';

angular.module('moments').factory('Upload', ['$http',
	function($http) {
		var uploadService = {
			uploadFile: function(file) {
				var uploadUrl = '/upload';
				var fd = new FormData();
				fd.append('file', file);
				var promise = $http.post(uploadUrl, fd, {
					transformRequest: angular.identity,
					headers: {'Content-Type': undefined}
				})
					.then(function(response){
						return response.data;
					});
				return promise;
			}
		};
		return uploadService;
	}
]);