(function () {
	'use strict';

	angular
		.module('app')
		.controller('PasswordController', PasswordController);

	PasswordController.$inject = ['$location', '$routeParams', '$filter', 'EncryptionService', 'ManagePasswordService'];
	function PasswordController($location, $routeParams, $filter, EncryptionService, ManagePasswordService) {
		var vm = this,
		encryptString = $routeParams.end,
		user_id = $routeParams.id,
		currentDate = new Date().setHours(0,0,0,0),
		endDate = EncryptionService.Decrypt(encryptString);
		vm.expired = false;

		if (new Date(endDate).setHours(0,0,0,0) < currentDate) {
			vm.expired = true;
			vm.message = "Seems like this page is already expired";
			vm.templateUrl = 'app/error/error.view.html';
		}

		vm.submitPassword = function() {
			var data = {
						id: user_id,
						password: EncryptionService.Encrypt(vm.pw1),
						lastModified: $filter('date')(currentDate, 'yyyy-MM-dd')
					};
					
			ManagePasswordService.resetPassword(data).then(function(res) {
				if (res.status) {
					$location.path('/login');
				} else {
					Materialize.toast('Error: Cannot change password', 5000);
				}
			});
		}

		vm.home = function() {
			$location.path('/');
		}
	}

})();