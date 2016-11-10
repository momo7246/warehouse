(function () {
		'use strict';

		angular
				.module('app')
				.controller('MasterController', MasterController);
		MasterController.$inject = ['ProductService', '$location', 'HomeToggleService', 'MenuService'];
		
		function MasterController(ProductService, $location, HomeToggleService, MenuService) {
			HomeToggleService.init();
			var vm = this;

			vm.hasProducts = true;
			vm.toggleMaster = HomeToggleService.toggleMaster();
			vm.sortKey = 'id';
			vm.reverse = true;
			vm.alertChangePassword = MenuService.alertChangePassword();
			vm.changePassword = MenuService.changePasswordLink;
			vm.logout = MenuService.logout;
			vm.templateMenu = 'app/home/layout/menu.html';
			vm.templateProduct = 'app/home/layout/product-table.html';
			vm.templateLoading = 'app/home/layout/loading.html';
			vm.sortBySelection = [
				{value: "ccn", description: "CCN#"},
				{value: "description", description: "Description"},
				{value: "part_ng", description: "Part Ng."},
				{value: "location", description: "Location"},
				{value: "year", description: "Year"}
			    ];

			vm.toggleInit = function() {
				var ele = $("#toggle-view span");
				ele.text("View");
			};

			vm.sortBy = function(sortKey) {
				vm.reverse = (vm.sortKey === sortKey) ? !vm.reverse : false;
				vm.sortKey = sortKey;
			};

			vm.getAll = function() {
				vm.bigSpinner = true;
				ProductService.getAllProduct().then(function(entities) {
					vm.locations = entities[0];
					angular.forEach(entities[1], function(p) {
						p.id = parseInt(p.id);
						p.ccn = parseInt(p.ccn);
						p.uslp = parseFloat(p.uslp);
						p.ndbp = parseFloat(p.ndbp);
					});
					vm.products = entities[1];
					if (vm.products.length == 0) {
						vm.hasProducts = false;
					}
				})
				.finally(function() {
					vm.bigSpinner = false;
				});
			}

			vm.toggleView = function() {
				$location.path('/');
				HomeToggleService.enableMasterHome();
			}

			vm.getBoolean = function(str) {
			    return !!JSON.parse(String(str).toLowerCase());
			}
		}
})();