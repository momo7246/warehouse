(function () {
		'use strict';

		angular
				.module('app')
				.controller('HomeController', HomeController);

		HomeController.$inject = ['ProductService', 'AuthenticationService', '$location', 'HomeToggleService', '$cookies'];
		function HomeController(ProductService, AuthenticationService, $location, HomeToggleService, $cookies) {
		    console.log('user');
				var vm = this,
				    user_id = $cookies.getObject('globals').currentUser.id;

				vm.toggleMaster = HomeToggleService.toggleMaster();
				vm.sortKey = 'id';
				vm.reverse = true;
				
				toggleInit();
			
				function toggleInit() {
				    var ele = $("#toggle-view span");
				    ele.text("View Master");
				};
				
				vm.sortBy = function(sortKey) {
					vm.reverse = (vm.sortKey === sortKey) ? !vm.reverse : false;
					vm.sortKey = sortKey;
				};
				
				vm.showCreateForm = function() {
					 vm.clearForm();
					 $('#modal-product-title').text("Create New Product");
					 $('#btn-update-product').hide();
					 $('#btn-create-product').show();
			 }
			 vm.clearForm = function(){
					 vm.id = "";
					 vm.name = "";
					 vm.description = "";
					 vm.price = "";
			 }
			 vm.createProduct = function() {
			 		vm.enableProgress = true;
					 var data = {
							 method: 'create',
							 name: vm.name,
							 description: vm.description,
							 price: vm.price,
							 user_id: user_id
					 };
					 ProductService.createProduct(data).then(function(res) {
					 		manageModal(res.status, res.message);
					 })
					 .finally(function() {
					 		vm.enableProgress = false;
					 });
			 }
			 vm.updateProduct = function() {
		 			vm.enableProgress = true;
					 var data = {
							 method: 'update',
							 id: vm.id,
							 name: vm.name,
							 description: vm.description,
							 price: vm.price,
							 user_id: user_id
					 };
					 ProductService.updateProduct(data).then(function(res) {
							 manageModal(res.status, res.message);
					 })
					 .finally(function() {
					 		vm.enableProgress = false;
					 });
			 }
			 vm.deleteProduct = function(id) {
			 		vm.enableDelete = true;
					 var data = {
							method: 'delete',
							id: id
					 };
					 ProductService.deleteProduct(data).then(function(res) {
							vm.getAll();
					 })
					 .finally(function() {
					 		vm.enableDelete = false;
					 });
			 }
			 vm.getAll = function() {
			     ProductService.getProductByUser(user_id).then(function(products) {
				 angular.forEach(products, function(p) {
				    p.id = parseInt(p.id);
				    p.price = parseFloat(p.price);
				});
				vm.products = products;
			     })
			 }
			 vm.readOne = function(id) {
						$('#modal-product-title').text("Edit Product");
						$('#btn-update-product').show();
						$('#btn-create-product').hide();
						ProductService.getProductById(id).then(function(res) {
								vm.id = res.id;
								vm.name = res.name;
								vm.description = res.description;
								vm.price = res.price;
								$('#modal-product-form').openModal();
						});
			 }
			 vm.logout = function() {
					 AuthenticationService.ClearCredentials();
					 $location.path('/login');
			 }

			 function manageModal(status, errMsg) {
			 		if (status) {
					 		vm.getAll();
					 		vm.clearForm();
					 		$('#modal-product-form').closeModal();
					 } else {
					 		Materialize.toast(errMsg, 5000);
					 }
			 }
			 
			 vm.toggleView = function() {
			     $location.path('/master');
			     HomeToggleService.enableMasterHome();
			}
		}

})();