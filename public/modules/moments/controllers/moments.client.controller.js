'use strict';

// Moments controller
angular.module('moments').controller('MomentsController',
    ['$scope', '$stateParams', '$location', 'Authentication', 'Moments', 'Upload',
        function ($scope, $stateParams, $location, Authentication, Moments, Upload) {
            $scope.authentication = Authentication;

            $scope.percent = '';
            $scope.files = [];

            // Create new Moment
            $scope.create = function () {
                // Create new Moment object
                var moment = new Moments({
                    title: this.title
                });

                // Redirect after save
                moment.$save(function (response) {
                    $location.path('moments/' + response._id);

                    // Clear form fields
                    $scope.title = '';
                    $scope.photo = '';
                    $scope.message = '';
                }, function (errorResponse) {
                    $scope.error = errorResponse.data.message;
                });
            };

            // Remove existing Moment
            $scope.remove = function (moment) {
                if (moment) {
                    moment.$remove();

                    for (var i in $scope.moments) {
                        if ($scope.moments [i] === moment) {
                            $scope.moments.splice(i, 1);
                        }
                    }
                } else {
                    $scope.moment.$remove(function () {
                        $location.path('moments');
                    });
                }
            };

            // Update existing Moment
            $scope.update = function () {
                var moment = $scope.moment;

                moment.$update(function () {
                    $location.path('moments/' + moment._id);
                }, function (errorResponse) {
                    $scope.error = errorResponse.data.message;
                });
            };

            // Find a list of Moments
            $scope.find = function () {
                $scope.moments = Moments.query();
            };

            // Find existing Moment
            $scope.findOne = function () {
                $scope.moment = Moments.get({
                    momentId: $stateParams.momentId
                });
            };

            // Upload image
            $scope.message = '';
            $scope.photo = '';
            $scope.uploadFile = function () {
                $scope.message = 'Uploading file...';
                var file = $scope.momentPhoto;
                Upload.uploadFile(file).then(function(data){
                   $scope.message = data.message;
                   $scope.photo = data.url;
                });
            };

        }
    ]);