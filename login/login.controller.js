(function () {
	'use strict';

	angular
		.module('app')
		.controller('LoginController', LoginController);

	LoginController.$inject = ['AuthenticationService', 'HomeToggleService'];
	function LoginController(AuthenticationService, HomeToggleService) {
	    console.log('login');
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
					HomeToggleService.toggleHomeLocation();
				} else {
					Materialize.toast(response.message, 5000);
				}
			})
			.finally(function() {
				vm.enableSpinner = false;
			});
		};
		
		vm.resetPassword = function() {
		    console.log('reset');
		}
	}

})();
