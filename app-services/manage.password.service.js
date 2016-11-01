(function () {
    'use strict';

    angular
        .module('app')
        .factory('ManagePasswordService', ManagePasswordService);

    ManagePasswordService.$inject = ['$rootScope', '$location', '$cookies', 'EncryptionService'];
    function ManagePasswordService($rootScope, $location, $cookies, EncryptionService) {
        var service = {};
	
	service.resetPassword = resetPassword;
	service.generateLink = generateLink;

        return service;
	
	function generateLink() {
	    var current = new Date();
	    current.setDate(current.getDate() + 1);
	    var month = current.getMonth() + 1,
		encryptedDate = EncryptionService.Encrypt(current.getFullYear() + "-" + month + "-" + current.getDate());
	    
	    $location.path('/resetPassword/'+encryptedDate);
	}
	
	function resetPassword() {
	    
	}
    }
})();
