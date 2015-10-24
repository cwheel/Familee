var familee = angular.module('familee', ['ngRoute', 'ngAnimate', 'ngBootstrapMaterial']);

familee.config(['$routeProvider','$locationProvider', function($routeProvider, $locationProvider) {
	$routeProvider
		.when('/', {
			templateUrl : 'routes/login.html',
			controller  : 'loginController'
		});
		
		$locationProvider.html5Mode(true);
}]);