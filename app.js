(function () {
	'use strict';

	angular
		.module('app', [
		    'ngRoute',
		    'ngCookies',
		    'angularUtils.directives.dirPagination',
		    'angularjs-crypto',
		    'angularUtils.directives.comparePassword',
		    'angularUtils.directives.currencyFormat'
		])
		.config(config)
		.run(run);

	config.$inject = ['$routeProvider'];
	function config($routeProvider) {
		$routeProvider
			.when('/', {
				controller: 'HomeController',
				templateUrl: 'app/home/home.view.html',
				controllerAs: 'vm'
			})
			
			.when('/master', {
				controller: 'MasterController',
				templateUrl: 'app/home/home.view.html',
				controllerAs: 'vm'
			})

			.when('/login', {
				controller: 'LoginController',
				templateUrl: 'app/login/login.view.html',
				controllerAs: 'vm'
			})
			
			.when('/resetPassword/:end/:id',  {
				controller: 'PasswordController',
				templateUrl: 'app/password/password.view.html',
				controllerAs: 'vm'
			})

			.otherwise({ redirectTo: '/login' });
	}

	run.$inject = ['$rootScope', '$location', '$cookies', '$http', 'cfCryptoHttpInterceptor'];
	function run($rootScope, $location, $cookies, $http, cfCryptoHttpInterceptor) {
		$rootScope.base64Key = CryptoJS.enc.Base64.parse("7B1105B127AFCAB81566AB0501A3784F8C1276256B8C42943BB33682C3BD086E");
		$rootScope.iv = CryptoJS.enc.Base64.parse("9355F8F8984747C5D5A1B3CF626C9A68FADF8FC98B1C8A4CDC249AC57A4BCBFA");
		// keep user logged in after page refresh
		$rootScope.globals = $cookies.get('globals') || {};
		if ($rootScope.globals.currentUser) {
			$http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.globals.currentUser.authdata; // jshint ignore:line
		}

		$rootScope.$on('$locationChangeStart', function (event, next, current) {
			// redirect to login page if not logged in and trying to access a restricted page
			var restrictedPage = $.inArray($location.path(), ['/', '/master']) >= 0;
			var loggedIn = $rootScope.globals.currentUser || $cookies.get('globals');
			if (restrictedPage && !loggedIn) {
				$location.path('/login');
			}
		});
	}

})();