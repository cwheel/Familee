var familee = angular.module('familee', ['ui.router', 'ngAnimate', 'ngBootstrapMaterial', 'anim-in-out', 'chart.js']);

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
	    })
	    .state('dashboard.main', {
	      url: "/main",
	      templateUrl: "routes/dashboard/main.html",
	      controller: 'mainDashController'
	    })
	    .state('dashboard.sleep', {
	      url: "/sleep",
	      templateUrl: "routes/dashboard/sleep.html",
	      controller: 'sleepDashController'
	    })
	    .state('dashboard.movement', {
	      url: "/movement",
	      templateUrl: "routes/dashboard/movement.html",
	      controller: 'movementDashController'
	    })
	    .state('dashboard.sickness', {
	      url: "/sickness",
	      templateUrl: "routes/dashboard/sickness.html",
	      controller: 'sickDashController'
	    });
}]);