'use strict';

// Moments controller
angular.module('moments').controller('MomentsController', ['$scope', '$stateParams', '$location', 'Authentication', 'Moments',
	function($scope, $stateParams, $location, Authentication, Moments) {
		$scope.authentication = Authentication;

		// Create new Moment
		$scope.create = function() {
			// Create new Moment object
			var moment = new Moments ({
				name: this.name
			});

			// Redirect after save
			moment.$save(function(response) {
				$location.path('moments/' + response._id);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Moment
		$scope.remove = function(moment) {
			if ( moment ) { 
				moment.$remove();

				for (var i in $scope.moments) {
					if ($scope.moments [i] === moment) {
						$scope.moments.splice(i, 1);
					}
				}
			} else {
				$scope.moment.$remove(function() {
					$location.path('moments');
				});
			}
		};

		// Update existing Moment
		$scope.update = function() {
			var moment = $scope.moment;

			moment.$update(function() {
				$location.path('moments/' + moment._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Moments
		$scope.find = function() {
			$scope.moments = Moments.query();
		};

		// Find existing Moment
		$scope.findOne = function() {
			$scope.moment = Moments.get({ 
				momentId: $stateParams.momentId
			});
		};
	}
]);