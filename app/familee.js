var familee = angular.module('familee', ['ngRoute', 'ngAnimate', 'ngBootstrapMaterial']);

familee.config(['$routeProvider','$locationProvider', function($routeProvider, $locationProvider) {
	$routeProvider
		.when('/', {
			templateUrl : 'routes/login.html',
			controller  : 'loginController'
		})
		.when('/dashboard', {
			templateUrl : 'routes/dashboard.html',
			controller  : 'dashboardController'
		});
		
		$locationProvider.html5Mode(true);
}]);