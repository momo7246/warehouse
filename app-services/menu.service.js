(function () {
	'use strict';

	angular
		.module('app')
		.factory('MenuService', MenuService);

	MenuService.$inject = ['$cookies', 'AuthenticationService', '$location', 'ManagePasswordService'];
	function MenuService($cookies, AuthenticationService, $location, ManagePasswordService) {
		var service = {};
	
		service.menuInit = menuInit;
		service.alertChangePassword = alertChangePassword;
		service.changePasswordLink = changePasswordLink;
		service.logout = logout;

		return service;
		
		function menuInit() {
			
		}

		function alertChangePassword() {
			var alert = false,
				today = new Date(),
				lastModified = $cookies.getObject('globals').currentUser.lastModified,
				lastModified = new Date(lastModified);
				lastModified.setDate(lastModified.getDate() + 27);

				if (today >= lastModified) {
					alert = true;
				}

			return alert;
		}

		function logout() {
			AuthenticationService.ClearCredentials();
			$location.path('/login');
		}

		function changePasswordLink() {
			var link = ManagePasswordService.generateLink(),
				user_id = $cookies.getObject('globals').currentUser.id;
			$location.path(link + "/" + user_id);
		}
	}
})();
