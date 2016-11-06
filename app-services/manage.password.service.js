(function () {
	'use strict';

	angular
		.module('app')
		.factory('ManagePasswordService', ManagePasswordService);

	ManagePasswordService.$inject = ['$rootScope', '$location', '$cookies', 'EncryptionService', '$http'];
	function ManagePasswordService($rootScope, $location, $cookies, EncryptionService, $http) {
		var service = {};
	
		service.resetPassword = resetPassword;
		service.requestForPassword = requestForPassword;
		service.generateLink = generateLink;

		return service;
	
		function generateLink() {
			var current = new Date();
			current.setDate(current.getDate() + 1);
			var month = current.getMonth() + 1,
			encryptedDate = EncryptionService.Encrypt(current.getFullYear() + "-" + month + "-" + current.getDate());
		
			return '/resetPassword/'+encryptedDate;
		}
	
		function resetPassword(data) {
			return $http.post('src/managePassword.php', data)
				.then(function(res) {
					return res.data;
				}, function() {
					return {status: false, message: "Cannot chnage password"};
				});
		}
	
		function requestForPassword(data) {
			return $http.get('src/managePassword.php', {params: data})
				.then(function(res) {
				return res.data;
			}, function() {
				return {status: false, message: "Your email is not registered"};
			});
		}
	}
})();
