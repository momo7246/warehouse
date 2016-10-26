(function () {
    'use strict';

    angular
        .module('app')
        .factory('ProductService', ProductService);

    ProductService.$inject = ['$http'];
    function ProductService($http) {
        var service = {};

        service.getOneById = getOneById;
        service.getProductByUser = getProductByUser;
        service.getAllProduct = getAllProduct;
        service.createProduct = createProduct;
        service.updateProduct = updateProduct;
        service.deleteProduct = deleteProduct;

        return service;

        function getAllProduct() {
           return $http.get('src/readProducts.php')
                   .then(function(res){
                       return res.data.records;
                    }, handleError('cannot get list of products'));
        }
        
        function getProductByUser(id) {
            return $http.post('src/readProducts.php', {user_id : id})
                   .then(function(res){
                       return res.data.records;
                    }, handleError('cannot get list of products for this user'));
        }
        
        function getOneById(data) {
            return $http.post('src/readProducts.php', data)
                   .then(function(res){
                       return res.data.records;
                    }, handleError('cannot get product'));
        }
        
        function createProduct(data) {
            return $http.post('src/manageProducts.php', data)
                    .then();
        }
        
        function deleteProduct(data) {
            return $http.post('src/manageProducts.php', data)
                    .then();
        }
        
        function updateProduct(data) {
            return $http.post('src/manageProducts.php',data)
                    .then();
        }

        function handleError(error) {
            return function () {
                return { success: false, message: error };
            };
        }
    }
})();
