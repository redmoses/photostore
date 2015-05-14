'use strict';

// Configuring the Articles module
angular.module('moments').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Moments','moments');
        Menus.addMenuItem('topbar', 'My Moments','moments/mine');
	}
]);
