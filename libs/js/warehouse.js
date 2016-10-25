(function() {
    
    'use strict';
    
    angular
     .module('app', ['angularUtils.directives.dirPagination'])
     .controller('productsCtrl', productsCtrl);
    
    productsCtrl.$inject = ['$scope', '$http'];
    
    function productsCtrl($scope, $http) {
        $scope.showCreateForm = function() {
           $scope.clearForm();
           $('#modal-product-title').text("Create New Product");
           $('#btn-update-product').hide();
           $('#btn-create-product').show();
       }
       $scope.clearForm = function(){
           $scope.id = "";
           $scope.name = "";
           $scope.description = "";
           $scope.price = "";
       }
       $scope.createProduct = function() {
           
       }
       $scope.updateProduct = function() {
           
       }
       $scope.deleteProduct = function() {
           
       }
       $scope.getAll = function() {
           $http.get('readProducts.php').success(function(response) {
               $scope.names = response.records;
           });
       }
       $scope.readOne = function(id) {
            $('#modal-product-title').text("Edit Product");
            $('#btn-update-product').show();
            $('#btn-create-product').hide();
       }
    }
})();
