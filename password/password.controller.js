(function () {
	'use strict';

	angular
		.module('app')
		.controller('PasswordController', PasswordController);

	PasswordController.$inject = ['$location', '$routeParams', 'EncryptionService', 'ManagePasswordService'];
	function PasswordController($location, $routeParams, EncryptionService, ManagePasswordService) {
	    var vm = this,
		encryptString = $routeParams.end,
		user_id = $routeParams.id,
		currentDate = new Date().setHours(0,0,0,0),
		endDate = EncryptionService.Decrypt(encryptString);
	
		vm.error = false;
		vm.expired = false;

	    if (new Date(endDate).setHours(0,0,0,0) < currentDate) {
		vm.expired = true;
		vm.message = "Seems like this page is already expired";
		vm.templateUrl = 'error/error.view.html';
	    }
	    vm.submitPassword = function() {
		var data = {
		    id: user_id,
		    password: EncryptionService.Encrypt(vm.pw1)
		};
		ManagePasswordService.resetPassword(data).then(function(res) {
		    if (res.status) {
			$location.path('/login');
		    } else {
			vm.error = true;
		    }
		});
	    }
	    vm.home = function() {
		$location.path('/');
	    }
	}

})();
