	'use strict';

// Configuring the Articles module
angular.module('moments').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Moments', 'moments', 'dropdown', '/moments(/create)?');
		Menus.addSubMenuItem('topbar', 'moments', 'List Moments', 'moments');
		Menus.addSubMenuItem('topbar', 'moments', 'New Moment', 'moments/create');
	}
]);