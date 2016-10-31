(function () {
	'use strict';

	angular
		.module('app')
		.controller('PasswordController', PasswordController);

	PasswordController.$inject = ['$location', 'AuthenticationService', 'HomeToggleService'];
	function PasswordController($location, AuthenticationService, HomeToggleService) {
	    
	}

})();
