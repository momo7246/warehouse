(function () {
	'use strict';

	angular
		.module('app')
		.controller('LoginController', LoginController);

	LoginController.$inject = ['$location', 'AuthenticationService', 'HomeToggleService', 'EncryptionService', 'ManagePasswordService'];
	function LoginController($location, AuthenticationService, HomeToggleService, EncryptionService, ManagePasswordService) {
		var vm = this;
		vm.login = login;
		
		initController();

		function initController() {
			AuthenticationService.ClearCredentials();
		}

		function login() {
			vm.enableSpinner = true;
			var pw = EncryptionService.Encrypt(vm.password);
			AuthenticationService.Login(vm.username, pw).then(function (response) {
				if (response.status) {
					var enable = checkChangePassword(response.lastModified);
					if (enable) {
						var path = ManagePasswordService.generateLink();
						$location.path(path + "/" + response.id);
					} else {
						AuthenticationService.SetCredentials(
							response.id,
							vm.username,
							pw,
							response.role,
							response.lastModified
						);
						HomeToggleService.toggleHomeLocation();
					}
				} else {
					Materialize.toast(response.message, 5000);
				}
			})
			.finally(function() {
				vm.enableSpinner = false;
			});
		};
		
		vm.requestPassword = function() {
			$('#request-password-form input').val("");
			$('#submit-request-password').removeClass('disabled');
			$('.request-error').addClass('hide');
			$('.request-success').addClass('hide');
			$('#modal-request-password').openModal();
		}
		vm.resetPassword = function() {
			var url = $location.$$absUrl.replace($location.path(), ""),
					link = url + ManagePasswordService.generateLink(),
					data = {
						email: vm.email,
						link: link
					};
			vm.disabledResetPassword = false;
			ManagePasswordService.requestForPassword(data).then(function(res) {
			if (res.status) {
				vm.disabledResetPassword = true;
				$('.request-error').addClass('hide');
				$('.request-success').removeClass('hide');
				$('#submit-request-password').addClass('disabled');
			} else {
				$('.request-error').removeClass('hide');
				$('.request-success').addClass('hide');
			}
			});
		}

		function checkChangePassword(lastModified) {
			var today = new Date(),
				lastModified = new Date(lastModified);
				lastModified.setDate(lastModified.getDate() + 30);

			return (today >= lastModified) ? true : false;
		}
	}

})();
