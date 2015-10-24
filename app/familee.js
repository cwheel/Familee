var familee = angular.module('familee', ['ui.router', 'ngAnimate', 'ngBootstrapMaterial']);

familee.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
	$urlRouterProvider.otherwise("/");

	$stateProvider
	    .state('login', {
	      url: "/",
	      templateUrl: "routes/login.html",
	      controller: 'loginController'
	    })
	    .state('dashboard', {
	      url: "/dashboard",
	      templateUrl: "routes/dashboard.html",
	      controller: 'dashboardController'
	    });
}]);