(function () {
    'use strict';

    angular
        .module('app')
        .factory('ManagePasswordService', ManagePasswordService);

    ManagePasswordService.$inject = ['$rootScope', '$location', '$cookies'];
    function ManagePasswordService($rootScope, $location, $cookies) {
        var service = {};
	
	service.resetPassword = resetPassword;

        return service;
	
	function resetPassword() {
	    
	}
    }
})();
