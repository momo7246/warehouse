(function () {
	'use strict';

	angular
		.module('app')
		.controller('PasswordController', PasswordController);

	PasswordController.$inject = ['$location', '$routeParams', 'EncryptionService', 'ManagePasswordService'];
	function PasswordController($location, $routeParams, EncryptionService, ManagePasswordService) {
	    var vm = this,
		encryptString = $routeParams.end,
		currentDate = new Date().setHours(0,0,0,0),
		endDate = EncryptionService.Decrypt(encryptString);

	    if (new Date(endDate).setHours(0,0,0,0) < currentDate) {
		console.log('error');
	    }
	    vm.submitPassword = function() {
		ManagePasswordService.resetPassword().then(function() {
		    
		});
	    }
	}

})();
