'use strict';

(function() {
	// Moments Controller Spec
	describe('Moments Controller Tests', function() {
		// Initialize global variables
		var MomentsController,
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

			// Initialize the Moments controller.
			MomentsController = $controller('MomentsController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one Moment object fetched from XHR', inject(function(Moments) {
			// Create sample Moment using the Moments service
			var sampleMoment = new Moments({
				name: 'New Moment'
			});

			// Create a sample Moments array that includes the new Moment
			var sampleMoments = [sampleMoment];

			// Set GET response
			$httpBackend.expectGET('moments').respond(sampleMoments);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.moments).toEqualData(sampleMoments);
		}));

		it('$scope.findOne() should create an array with one Moment object fetched from XHR using a momentId URL parameter', inject(function(Moments) {
			// Define a sample Moment object
			var sampleMoment = new Moments({
				name: 'New Moment'
			});

			// Set the URL parameter
			$stateParams.momentId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/moments\/([0-9a-fA-F]{24})$/).respond(sampleMoment);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.moment).toEqualData(sampleMoment);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(Moments) {
			// Create a sample Moment object
			var sampleMomentPostData = new Moments({
				name: 'New Moment'
			});

			// Create a sample Moment response
			var sampleMomentResponse = new Moments({
				_id: '525cf20451979dea2c000001',
				name: 'New Moment'
			});

			// Fixture mock form input values
			scope.name = 'New Moment';

			// Set POST response
			$httpBackend.expectPOST('moments', sampleMomentPostData).respond(sampleMomentResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the Moment was created
			expect($location.path()).toBe('/moments/' + sampleMomentResponse._id);
		}));

		it('$scope.update() should update a valid Moment', inject(function(Moments) {
			// Define a sample Moment put data
			var sampleMomentPutData = new Moments({
				_id: '525cf20451979dea2c000001',
				name: 'New Moment'
			});

			// Mock Moment in scope
			scope.moment = sampleMomentPutData;

			// Set PUT response
			$httpBackend.expectPUT(/moments\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/moments/' + sampleMomentPutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid momentId and remove the Moment from the scope', inject(function(Moments) {
			// Create new Moment object
			var sampleMoment = new Moments({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new Moments array and include the Moment
			scope.moments = [sampleMoment];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/moments\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(sampleMoment);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.moments.length).toBe(0);
		}));
	});
}());