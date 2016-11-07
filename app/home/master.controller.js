(function () {
		'use strict';

		angular
				.module('app')
				.controller('MasterController', MasterController);
		MasterController.$inject = ['ProductService', '$location', 'HomeToggleService', 'MenuService'];
		
		function MasterController(ProductService, $location, HomeToggleService, MenuService) {
			HomeToggleService.init();
			var vm = this;

			vm.bigSpinner = true;
			vm.toggleMaster = HomeToggleService.toggleMaster();
			vm.sortKey = 'id';
			vm.reverse = true;
			vm.alertChangePassword = MenuService.alertChangePassword();
			vm.changePassword = MenuService.changePasswordLink;
			vm.logout = MenuService.logout;
			vm.templateMenu = 'app/home/layout/menu.html';
			vm.templateLoading = 'app/home/layout/loading.html';

			vm.toggleInit = function() {
				var ele = $("#toggle-view span");
				ele.text("View");
			};

			vm.sortBy = function(sortKey) {
				vm.reverse = (vm.sortKey === sortKey) ? !vm.reverse : false;
				vm.sortKey = sortKey;
			};

			vm.getAll = function() {
				ProductService.getAllProduct().then(function(entities) {
					vm.locations = entities[0];
					angular.forEach(entities[1], function(p) {
						p.id = parseInt(p.id);
					});
					vm.products = entities[1];
				})
				.finally(function() {
					vm.bigSpinner = false;
				});
			}

			vm.toggleView = function() {
				$location.path('/');
				HomeToggleService.enableMasterHome();
			}
		}
})();