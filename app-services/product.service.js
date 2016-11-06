(function () {
	'use strict';

	angular
		.module('app')
		.factory('ProductService', ProductService);

	ProductService.$inject = ['$http', '$q'];
	function ProductService($http, $q) {
		var service = {};
	
		service.getProductById = getProductById;
		service.getProductByUser = getProductByUser;
		service.getAllProduct = getAllProduct;
		service.createProduct = createProduct;
		service.updateProduct = updateProduct;
		service.deleteProduct = deleteProduct;

		return service;
		
		function getAllProduct() {
			var promises = [];
			promises.push(getAllLocations());
			var getProducts = $http.get('src/readProducts.php')
				  .then(handleSuccess, handleError('cannot get list of products'));
			promises.push(getProducts);

			return $q.all(promises);
		}
		
		function getProductByUser(id) {
			var promises = [];
			promises.push(getAllTypes());
			promises.push(getAllLocations());
			var getProducts = $http.get('src/readProducts.php', {params: {user_id : id}})
				  .then(handleSuccess, handleError('cannot get list of products for this user'));
			promises.push(getProducts);

			return $q.all(promises);
		}
		
		function getProductById(id) {
			return $http.get('src/readProducts.php', {params: {id : id}})
				   .then(handleSuccess, handleError('cannot get product'));
		}
		
		function createProduct(data) {
			return $http.post('src/manageProducts.php', data)
					.then(handleSuccess, handleError('cannot create product'));
		}
		
		function deleteProduct(data) {
			return $http.post('src/manageProducts.php', data)
					.then(handleSuccess, handleError('cannot delete product'));
		}
		
		function updateProduct(data) {
			return $http.post('src/manageProducts.php', data)
					.then(handleSuccess, handleError('cannot update product'));
		}
	
		function getAllTypes() {
			return $http.get('src/readType.php')
				.then(handleSuccess, handleError('cannot find type'));
		}
	
		function getAllLocations() {
			return $http.get('src/readLocation.php')
				.then(handleSuccess, handleError('cannot find location'));
		}

		function handleSuccess(res) {
			return res.data;
		}

		function handleError(error) {
			return function () {
				return { status: false, message: error };
			};
		}
	}
})();
