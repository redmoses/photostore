'use strict';

(function() {
	// Photos Controller Spec
	describe('Photos Controller Tests', function() {
		// Initialize global variables
		var PhotosController,
		scope,
		$httpBackend,
		$stateParams,
		$location;

		// The $resource service augments the response object with methods for updating and deleting the resource.
		// If we were to use the standard toEqual matcher, our tests would fail because the test values would not match
		// the responses exactly. To solve the problem, we define a new toEqualData Jasmine matcher.
		// When the toEqualData matcher compares two objects, it takes only object properties into
		// account and ignores methods.
		beforeEach(function() {
			jasmine.addMatchers({
				toEqualData: function(util, customEqualityTesters) {
					return {
						compare: function(actual, expected) {
							return {
								pass: angular.equals(actual, expected)
							};
						}
					};
				}
			});
		});

		// Then we can start by loading the main application module
		beforeEach(module(ApplicationConfiguration.applicationModuleName));

		// The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
		// This allows us to inject a service but then attach it to a variable
		// with the same name as the service.
		beforeEach(inject(function($controller, $rootScope, _$location_, _$stateParams_, _$httpBackend_) {
			// Set a new global scope
			scope = $rootScope.$new();

			// Point global variables to injected services
			$stateParams = _$stateParams_;
			$httpBackend = _$httpBackend_;
			$location = _$location_;

			// Initialize the Photos controller.
			PhotosController = $controller('PhotosController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one Photo object fetched from XHR', inject(function(Photos) {
			// Create sample Photo using the Photos service
			var samplePhoto = new Photos({
				name: 'New Photo'
			});

			// Create a sample Photos array that includes the new Photo
			var samplePhotos = [samplePhoto];

			// Set GET response
			$httpBackend.expectGET('photos').respond(samplePhotos);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.photos).toEqualData(samplePhotos);
		}));

		it('$scope.findOne() should create an array with one Photo object fetched from XHR using a photoId URL parameter', inject(function(Photos) {
			// Define a sample Photo object
			var samplePhoto = new Photos({
				name: 'New Photo'
			});

			// Set the URL parameter
			$stateParams.photoId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/photos\/([0-9a-fA-F]{24})$/).respond(samplePhoto);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.photo).toEqualData(samplePhoto);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(Photos) {
			// Create a sample Photo object
			var samplePhotoPostData = new Photos({
				name: 'New Photo'
			});

			// Create a sample Photo response
			var samplePhotoResponse = new Photos({
				_id: '525cf20451979dea2c000001',
				name: 'New Photo'
			});

			// Fixture mock form input values
			scope.name = 'New Photo';

			// Set POST response
			$httpBackend.expectPOST('photos', samplePhotoPostData).respond(samplePhotoResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the Photo was created
			expect($location.path()).toBe('/photos/' + samplePhotoResponse._id);
		}));

		it('$scope.update() should update a valid Photo', inject(function(Photos) {
			// Define a sample Photo put data
			var samplePhotoPutData = new Photos({
				_id: '525cf20451979dea2c000001',
				name: 'New Photo'
			});

			// Mock Photo in scope
			scope.photo = samplePhotoPutData;

			// Set PUT response
			$httpBackend.expectPUT(/photos\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/photos/' + samplePhotoPutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid photoId and remove the Photo from the scope', inject(function(Photos) {
			// Create new Photo object
			var samplePhoto = new Photos({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new Photos array and include the Photo
			scope.photos = [samplePhoto];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/photos\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(samplePhoto);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.photos.length).toBe(0);
		}));
	});
}());