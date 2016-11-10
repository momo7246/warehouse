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
		endDate = EncryptionService.Decrypt(encryptString),
		splitEndDate = endDate.split("-");

		vm.expired = false;

		if (new Date(splitEndDate[1]+"/"+splitEndDate[2]+"/"+splitEndDate[0]).setHours(0,0,0,0) < currentDate) {
			vm.expired = true;
			vm.message = "Seems like this page is already expired";
			vm.templateUrl = 'app/error/error.view.html';
		}

		vm.submitPassword = function() {
			vm.enableSpinner = true;
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
			})
			.finally(function() {
			    vm.enableSpinner = false;
			});
		}

		vm.home = function() {
			$location.path('/');
		}
	}

})();
