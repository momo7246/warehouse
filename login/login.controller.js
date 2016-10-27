(function () {
	'use strict';

	angular
		.module('app')
		.controller('LoginController', LoginController);

	LoginController.$inject = ['$location', 'AuthenticationService'];
	function LoginController($location, AuthenticationService) {
		var vm = this;
		vm.login = login;

		(function initController() {
			AuthenticationService.ClearCredentials();
		})();

		function login() {
			vm.enableSpinner = true;
			AuthenticationService.Login(vm.username, vm.password).then(function (response) {
				if (response.success) {
					AuthenticationService.SetCredentials(response.id, vm.username, vm.password, response.role);
					$location.path('/');  
				} else {
					Materialize.toast(response.message, 5000);
				}
			})
			.finally(function() {
				vm.enableSpinner = false;
			});
		};
	}

})();
