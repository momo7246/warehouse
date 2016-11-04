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
			     vm.product = {};
			 }
			 vm.createProduct = function() {
				if(vm.product === undefined) return;
			 		vm.enableProgress = true;
					vm.product['method'] = 'create';
					vm.product['location_id'] = vm.product.location_id.id;
					vm.product['type_id'] = vm.product.type_id.id;
					vm.product['user_id'] = user_id;
					 ProductService.createProduct(vm.product).then(function(res) {
					     manageResponse(res.status, res.message);
					 })
					 .finally(function() {
					 		vm.enableProgress = false;
					 });
			 }
			 vm.updateProduct = function(id) {
			     if(vm.product === undefined) return;
				vm.clearForm();
				vm.product['method'] = 'update';
				vm.product['location_id'] = vm.product.location_id.id;
				vm.product['type_id'] = vm.product.type_id.id;
				vm.product['user_id'] = user_id;
				vm.product['id'] = id;
		 			vm.enableProgress = true;
					 ProductService.updateProduct(vm.product).then(function(res) {
							 manageResponse(res.status, res.message);
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
			     ProductService.getProductByUser(user_id).then(function(entities) {
				 vm.types = entities[0];
				 vm.locations = entities[1];
				 angular.forEach(entities[2], function(p) {
				    p.id = parseInt(p.id);
				    p.price = parseFloat(p.price);
				    p.selected = false;
				});
				vm.products = entities[2];
			     })
			 }
			 vm.triggerInfoDialog = function(id) {
			     angular.forEach(vm.products, function(p) {
				 if (p.id === id && p.selected){
				     vm.readOne(id);
				 } else {
				     p.selected = false;
				 }
			     }); 
			 }
			 vm.readOne = function(id) {
				if (id === undefined) return;
				vm.clearForm();
				$('#product-form-title').text("Product Detail");
				$('#btn-update-product').show();
				$('#btn-delete-product').show();
				$('#btn-create-product').hide();
				ProductService.getProductById(id).then(function(res) {
				    vm.product = res;
				    $('.product-form').removeClass('hide');
				});
			 }
			 
			 vm.changePassword = function() {
			     var link = ManagePasswordService.generateLink();
			     
			     $location.path(link+"/"+user_id);
			 }
			 
			 vm.logout = function() {
					 AuthenticationService.ClearCredentials();
					 $location.path('/login');
			 }

			 function manageResponse(status, errMsg) {
			 		if (status) {
					 		vm.getAll();
					 		vm.clearForm();
							$('.product-form').addClass('hide');
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