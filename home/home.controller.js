(function () {
		'use strict';

		angular
				.module('app')
				.controller('HomeController', HomeController);

		HomeController.$inject = [
		    '$scope',
		    'ProductService',
		    'AuthenticationService',
		    '$location',
		    'HomeToggleService',
		    '$cookies',
		    'ManagePasswordService'
		];
		function HomeController($scope, ProductService, AuthenticationService, $location, HomeToggleService, $cookies, ManagePasswordService) {
		    console.log('user');
				var vm = this,
				    user_id = $cookies.getObject('globals').currentUser.id;

				vm.toggleMaster = HomeToggleService.toggleMaster();
				vm.sortKey = 'id';
				vm.reverse = true;
				vm.templateMenu = 'home/layout/menu.html';
				vm.templateForm = 'home/layout/product_form.html';
			
				vm.toggleInit = function() {
				    var ele = $("#toggle-view span");
				    ele.text("View Master");
				};
				
				getAllTypes();
				getAllLocations();
				
				$scope.$watch('vm.productId', function(id) {
				    vm.readOne(id);
				});
				
				vm.sortBy = function(sortKey) {
					vm.reverse = (vm.sortKey === sortKey) ? !vm.reverse : false;
					vm.sortKey = sortKey;
				};
				
				vm.showCreateForm = function() {
					 vm.clearForm(); 
					 $('#product-form-title').text("Create New Product");
					 $('#btn-update-product').hide();
					 $('#btn-delete-product').hide();
					 $('#btn-create-product').show();
					 $('.product-form').removeClass('hide');
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
				vm.productId = id;
				$('#product-form-title').text("Product Detail");
				$('#btn-update-product').show();
				$('#btn-delete-product').show();
				$('#btn-create-product').hide();
				ProductService.getProductById(id).then(function(res) {
						vm.id = res.id;
						vm.cnn = res.cnn;
						vm.description = res.description;
						$('.product-form').removeClass('hide');
				});
				
				
//						ProductService.getProductById(id).then(function(res) {
//								vm.id = res.id;
//								vm.name = res.name;
//								vm.description = res.description;
//								vm.price = res.price;
//								$('#modal-product-form').openModal();
//						});
			 }
			 
			 vm.changePassword = function() {
			     var link = ManagePasswordService.generateLink();
			     
			     $location.path(link+"/"+user_id);
			 }
			 
			 vm.logout = function() {
					 AuthenticationService.ClearCredentials();
					 $location.path('/login');
			 }
			 
			 function getAllTypes() {
			     ProductService.getAllTypes().then(function(types) {
				 vm.types = types;
			     });
			 }
			 function getAllLocations() {
			     ProductService.getAllLocations().then(function(locations) {
				vm.locations = locations; 
			     });
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