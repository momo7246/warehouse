(function () {
		'use strict';

		angular
				.module('app')
				.controller('MasterController', MasterController);
		MasterController.$inject = ['ProductService', 'AuthenticationService', '$location', 'HomeToggleService'];
		function MasterController(ProductService, AuthenticationService, $location, HomeToggleService) {
		    console.log('master');
			var vm = this;

			vm.toggleMaster = HomeToggleService.toggleMaster();
			vm.sortKey = 'id';
			vm.reverse = true;
			vm.templateMenu = 'home/layout/menu.html';

			vm.toggleInit = function() {
			    var ele = $("#toggle-view span");
			    ele.text("View");
			};

			vm.sortBy = function(sortKey) {
				vm.reverse = (vm.sortKey === sortKey) ? !vm.reverse : false;
				vm.sortKey = sortKey;
			};

			 vm.getAll = function() {
			     ProductService.getAllProduct().then(function(products) {
				 angular.forEach(products, function(p) {
				    p.id = parseInt(p.id);
				    p.price = parseFloat(p.price);
				});
				vm.products = products;
			     });
			 }

			 vm.logout = function() {
				AuthenticationService.ClearCredentials();
				$location.path('/login');
			 }

			 vm.toggleView = function() {
			     $location.path('/');
			     HomeToggleService.enableMasterHome();
			}
		}
})();