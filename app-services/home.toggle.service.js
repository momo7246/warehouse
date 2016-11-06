(function () {
	'use strict';

	angular
		.module('app')
		.factory('HomeToggleService', HomeToggleService);

	HomeToggleService.$inject = ['$rootScope', '$location', '$cookies'];
	function HomeToggleService($rootScope, $location, $cookies) {
		var service = {};
	
		service.init = init;
		service.toggleMaster = toggleMaster;
		service.toggleHomeLocation = toggleHomeLocation;
		service.enableMasterHome = enableMasterHome;

		return service;

		function init() {
			var toggle = $cookies.get('toggle'),
				path = $location.$$path;
			if ((toggle == 'true') && (path !== '/master')) {
				$location.path('/master');
			} else if ((toggle == 'false') && (path !== '/')) {
				$location.path('/');
			}
		}
	
		function toggleMaster() {
			var enable = ($cookies.get('toggle') === "true") ? true : false;
			return enable;
		}

		function toggleHomeLocation() {
			var toggle = false;
			if ($rootScope.globals.currentUser.role !== '1') {
				$location.path('/');
			} else {
				toggle = true;
				$location.path('/master');
			}
			$cookies.put('toggle', toggle);
		}
		
		function enableMasterHome() {
			var toggle = toggleMaster();
			$cookies.put('toggle', !toggle);  
		}
	}
})();
