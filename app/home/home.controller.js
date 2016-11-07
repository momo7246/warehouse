(function () {
		'use strict';

		angular
				.module('app')
				.controller('HomeController', HomeController);

		HomeController.$inject = [
			'ProductService',
			'$location',
			'HomeToggleService',
			'$cookies',
			'MenuService'
		];

		function HomeController(ProductService, $location, HomeToggleService, $cookies, MenuService) {
			HomeToggleService.init();
			var vm = this,
				user_id = $cookies.getObject('globals').currentUser.id;

			vm.hasProducts = true;
			vm.toggleMaster = HomeToggleService.toggleMaster();
			vm.sortKey = 'id';
			vm.reverse = true;
			vm.alertChangePassword = MenuService.alertChangePassword();
			vm.changePassword = MenuService.changePasswordLink;
			vm.logout = MenuService.logout;
			vm.templateMenu = 'app/home/layout/menu.html';
			vm.templateForm = 'app/home/layout/product_form.html';
			vm.templateLoading = 'app/home/layout/loading.html';

			if (vm.alertChangePassword) {
				$('#modal-alert-password').openModal();
			}
		
			vm.toggleInit = function() {
				var ele = $("#toggle-view span");
				ele.text("View Master");
			};
			
			vm.sortBy = function(sortKey) {
				vm.reverse = (vm.sortKey === sortKey) ? !vm.reverse : false;
				vm.sortKey = sortKey;
			};
			
			vm.showCreateForm = function() {
				clearForm(); 
				$('#product-form-title').text("Create New Product");
				$('#btn-update-product').hide();
				$('#btn-delete-product').hide();
				$('#btn-create-product').show();
				$('.product-form').removeClass('hide');
			}

			function clearForm(){
				vm.product = {};
			}

			vm.createProduct = function() {
				if(vm.product === undefined) return;

				vm.enableProgress = true;
				vm.product['method'] = 'create';
				vm.product['user_id'] = user_id;

				ProductService.createProduct(vm.product).then(function(res) {
					manageResponse(res.status, res.message, 'Successfully create product');
				})
				.finally(function() {
					vm.enableProgress = false;
				});
			}

			vm.updateProduct = function(id) {
				if(vm.product === undefined) return;

				vm.enableProgress = true;
				vm.product['method'] = 'update';
				vm.product['user_id'] = user_id;
				vm.product['id'] = id;

				ProductService.updateProduct(vm.product).then(function(res) {
					manageResponse(res.status, res.message, 'Successfully update product');
				})
				.finally(function() {
					vm.enableProgress = false;
				});
			}

			vm.triggerDelete = function() {
				$('#modal-delete-product').openModal();
			}

			vm.deleteProduct = function(id) {
				vm.enableProgress = true;
				var data = {
					method: 'delete',
					id: id
				};

				ProductService.deleteProduct(data).then(function(res) {
					manageResponse(res.status, res.message, 'Succesfully delete product');
					$('#modal-delete-product').closeModal();
				})
				.finally(function() {
					vm.enableProgress = false;
				});
			}

			vm.getAll = function() {
				vm.bigSpinner = true;
				vm.hasProducts = true;
				ProductService.getProductByUser(user_id).then(function(entities) {
					vm.types = entities[0];
					vm.locations = entities[1];
					angular.forEach(entities[2], function(p) {
						p.id = parseInt(p.id);
						p.cnn = parseInt(p.cnn);
						p.selected = false;
					});
					vm.products = entities[2];
					if (vm.products.length == 0) {
						vm.hasProducts = false;
					}
				})
				.finally(function() {
					vm.bigSpinner = false;
				});
			}

			vm.triggerInfoDialog = function(id) {
				$('.product-form').addClass('hide');
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
				vm.loadingFormSpinner = true;
				clearForm();
				ProductService.getProductById(id).then(function(res) {
					vm.product = res;
					$('#product-form-title').text("Product Detail");
					$('#btn-update-product').show();
					$('#btn-delete-product').show();
					$('#btn-create-product').hide();
					$(".product-form label").addClass('active');
				})
				.finally(function() {
					vm.loadingFormSpinner = false;
				});
			}

			vm.close = function() {
				$('.product-form').addClass('hide');
			}

			function manageResponse(status, errMsg, successMsg) {
				if (status) {
						vm.getAll();
						clearForm();
						vm.close();
						Materialize.toast(successMsg, 5000);
				} else {
						Materialize.toast(errMsg, 5000);
				}
			}
			 
			vm.toggleView = function() {
				$location.path('/master');
				HomeToggleService.enableMasterHome();
			}
			
			vm.getBoolean = function(str) {
			    return !!JSON.parse(String(str).toLowerCase());
			}
			
			vm.enableNote = function(checked) {
			    var enabled;
			    if (checked === '1' || checked === '0') {
					enabled = vm.getBoolean(checked) ? false : true;
			    } else {
					enabled = vm.getBoolean(checked);
			    }
			    if (!enabled) {
					vm.product.note_details = '';
					var ele = angular.element(document.getElementById('noteDetails').parentElement.parentElement);
					ele.addClass('ng-hide');
			    }
			}
		}

})();