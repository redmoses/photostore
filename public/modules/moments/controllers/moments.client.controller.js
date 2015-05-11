'use strict';

// Moments controller
angular.module('moments').controller('MomentsController',
    ['$scope','$state', '$stateParams', '$location', 'Authentication', 'Moments', 'Upload', 'Lightbox', '$modal',
        function ($scope, $state, $stateParams, $location, Authentication, Moments, Upload, Lightbox, $modal) {
            $scope.authentication = Authentication;
            $scope.uploading = false;

            // Create new Moment
            $scope.create = function (modal) {
                // Create new Moment object
                var moment = new Moments({
                    title: this.title,
                    photo: this.photo
                });

                // Redirect after save
                moment.$save(function (response) {
                    $location.path('moments');
                    // Clear form fields
                    $scope.title = '';
                    $scope.photo = '';
                    $scope.message = '';
                    // close the modal
                    modal.$close();
                    // reload view
                    $state.reload();
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
                    $location.path('moments');
                    $scope.openLightBox(moment.photo, moment.title);
                }, function (errorResponse) {
                    $scope.error = errorResponse.data.message;
                });
            };

            // Find a list of Moments
            $scope.find = function () {
                $scope.showSearch = true;
                $scope.moments = Moments.query();
            };

            // Find existing Moment
            $scope.findOne = function () {
                $scope.moment = Moments.get({
                    momentId: $stateParams.momentId
                });
            };

            // Find user specific Moments
            $scope.findUserMoments = function () {
                $scope.moments = '';
                $scope.moments = Moments.get({
                    user: $scope.authentication.user
                });
            };

            // Upload image
            $scope.message = '';
            $scope.photo = '';
            $scope.photoThumb = '';
            $scope.uploadFile = function () {
                $scope.message = 'Uploading file...';
                $scope.uploading = true;

                var file = $scope.momentPhoto;
                Upload.uploadFile(file).then(function(data){
                    $scope.uploading = false;
                    $scope.message = data.message;
                    $scope.photo = data.url;
                    $scope.photoThumb = data.thumbUrl;

                    if ($scope.moment.photo)
                       $scope.moment.photo = $scope.photo;
                });
            };

            // Open Image in LightBox
            $scope.openLightBox = function (photo, title) {
                var photos = [{
                    'url': photo,
                    'caption': title
                }];
                Lightbox.openModal(photos, 0);
            };

            // Moment Uploader Modal
            $scope.openUploader = function () {
                $modal.open({
                    templateUrl: 'modules/moments/views/create-moment.client.view.html'
                });
            };

        }
    ]);
