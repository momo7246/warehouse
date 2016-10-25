(function () {
    'use strict';

    angular
        .module('app')
        .controller('HomeController', HomeController);

    HomeController.$inject = ['UserService', '$rootScope', '$http'];
    function HomeController(UserService, $rootScope, $http) {
        var vm = this;

        vm.user = null;
        vm.allUsers = [];
        vm.deleteUser = deleteUser;
        
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
           
       }
       vm.updateProduct = function() {
           
       }
       vm.deleteProduct = function() {
           
       }
       vm.getAll = function() {
           $http.get('src/readProducts.php').success(function(response) {
               vm.names = response.records;
           });
       }
       vm.readOne = function(id) {
            $('#modal-product-title').text("Edit Product");
            $('#btn-update-product').show();
            $('#btn-create-product').hide();
       }

//        initController();
//
//        function initController() {
//            loadCurrentUser();
//            loadAllUsers();
//        }

        function loadCurrentUser() {
            UserService.GetByUsername($rootScope.globals.currentUser.username)
                .then(function (user) {
                    vm.user = user;
                });
        }

        function loadAllUsers() {
            UserService.GetAll()
                .then(function (users) {
                    vm.allUsers = users;
                });
        }

        function deleteUser(id) {
            UserService.Delete(id)
            .then(function () {
                loadAllUsers();
            });
        }
    }

})();