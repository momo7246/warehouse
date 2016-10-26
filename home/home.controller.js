(function () {
    'use strict';

    angular
        .module('app')
        .controller('HomeController', HomeController);

    HomeController.$inject = ['ProductService', '$rootScope'];
    function HomeController(ProductService, $rootScope) {
        var vm = this,
            user_id = $rootScope.globals.currentUser.id;
        
        vm.isAdmin = ($rootScope.globals.currentUser.role == '1') ? true : false;
        vm.sortKey = 'id';
        vm.reverse = true;
        
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
           var data = {
               method: 'create',
               name: vm.name,
               description: vm.description,
               price: vm.price,
               user_id: user_id
           };
           ProductService.createProduct(data).then(function(res) {
               
           });
       }
       vm.updateProduct = function() {
           var data = {
               method: 'update',
               id: vm.id,
               name: vm.name,
               description: vm.description,
               price: vm.price,
               user_id: user_id
           };
           ProductService.updateProduct(data).then(function(res) {
               
           });
       }
       vm.deleteProduct = function(id) {
           var data = {
              method: 'delete',
              id: id
           };
           ProductService.deleteProduct(data).then(function(res) {
               
           });
       }
       vm.getAll = function() {
           var service = (vm.isAdmin) ? ProductService.getAllProduct() : ProductService.getProductByUser(user_id);
           service.then(function(products) {
              angular.forEach(products, function(p) {
                  p.id = parseInt(p.id);
                  p.price = parseFloat(p.price);
              });
              vm.products = products; 
           });
       }
       vm.readOne = function(id) {
           var data = {id:id};
            $('#modal-product-title').text("Edit Product");
            $('#btn-update-product').show();
            $('#btn-create-product').hide();
            ProductService.getOneById(data).then(function(res) {
                vm.id = res.id;
                vm.name = res.name;
                vm.description = res.description;
                vm.price = res.price;
                $('#modal-product-form').openModal();
            });
       }
//       
//        function loadCurrentUser() {
//            UserService.GetByUsername($rootScope.globals.currentUser.username)
//                .then(function (user) {
//                    vm.user = user;
//                });
//        }
    }

})();