'use strict';

// Configuring the Articles module
angular.module('photos').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Photos', 'photos', 'dropdown', '/photos(/create)?');
		Menus.addSubMenuItem('topbar', 'photos', 'List Photos', 'photos');
		Menus.addSubMenuItem('topbar', 'photos', 'New Photo', 'photos/create');
	}
]);