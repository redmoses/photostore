'use strict';

//Start by defining the main module and adding the module dependencies
angular.module(ApplicationConfiguration.applicationModuleName, ApplicationConfiguration.applicationModuleVendorDependencies);

// Setting HTML5 Location Mode and Lightbox Template
angular.module(ApplicationConfiguration.applicationModuleName).config(['$locationProvider','LightboxProvider',
	function($locationProvider, LightboxProvider) {
		$locationProvider.hashPrefix('!');
		LightboxProvider.templateUrl = 'modules/moments/views/LightBoxTemplate.html';
	}
]);

//Then define the init function for starting up the application
angular.element(document).ready(function() {
	//Fixing facebook bug with redirect
	if (window.location.hash === '#_=_') window.location.hash = '#!';

	//Then init the app
	angular.bootstrap(document, [ApplicationConfiguration.applicationModuleName]);
});
