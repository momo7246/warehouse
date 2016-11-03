(function() {
'use strict';
angular.module('angularUtils.directives.productSelection', [])
    .directive('proSelection', [function () {
    return {
	bindToController: {
	    callback: '&'
	},
	controller: 'HomeController',
	controllerAs: 'vm',
	require: 'ngModel',
	scope: true,
        link: function (scope, ele, attrs, vm) {
	    var selected = '#' + attrs.id;
	    if (ele.add(selected).is(":checked")) {
		console.log('hello');
		vm.productId = attrs.value;
	    }
//            iElement.add(selected).is('keyup', function () {
//                scope.$apply(function () {
//                    ctrl.$setValidity('pwmatch', elem.val() === $(firstPassword).val());
//                });
//            });
//	    console.log('in herer');
//            var checkboxs = $("#product-table input[type='checkbox']");
//	    checkboxs.on('click', function() {
//		if($(this).is(":checked")) {
//		    console.log('check');
//		}
//	    })
        }
    }
}]);
})();